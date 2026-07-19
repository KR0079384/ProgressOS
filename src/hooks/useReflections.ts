/**
 * hooks/useReflections.ts
 *
 * TanStack Query hooks for the Reflection System.
 *
 * All cache keys are defined as a factory at the top — import them
 * anywhere invalidation is needed to avoid string typos.
 *
 * Exports:
 *   reflectionKeys       — query key factory
 *   useTodayReflection   — query: today's single row
 *   useRecentReflections — query: last N days of rows
 *   useUpsertReflection  — mutation: create-or-update today
 *   useReflectionInsights — derived: computed analytics from recent history
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import {
  fetchRecentReflections,
  fetchTodayReflection,
  upsertReflection,
} from "@/lib/reflections";
import type { DailyLog, ReflectionInsertPayload, ReflectionInsights } from "@/lib/types";

// ─── Query Key Factory ────────────────────────────────────────────────────────

export const reflectionKeys = {
  all: (userId: string) => ["reflections", userId] as const,
  today: (userId: string) => ["reflections", userId, "today"] as const,
  recent: (userId: string, days: number) =>
    ["reflections", userId, "recent", days] as const,
} as const;

// ─── useTodayReflection ───────────────────────────────────────────────────────

/**
 * Fetches the current user's reflection for today.
 * Returns `null` when no entry exists yet (not an error state).
 */
export function useTodayReflection() {
  const { user } = useAuth();

  return useQuery<DailyLog | null>({
    queryKey: user ? reflectionKeys.today(user.id) : [],
    queryFn: () => fetchTodayReflection(user!.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes — reflection data is slow-changing
  });
}

// ─── useRecentReflections ─────────────────────────────────────────────────────

/**
 * Fetches the current user's reflections for the last `days` days.
 * Defaults to 7 days. Used by the insights panel.
 */
export function useRecentReflections(days: number = 7) {
  const { user } = useAuth();

  return useQuery<DailyLog[]>({
    queryKey: user ? reflectionKeys.recent(user.id, days) : [],
    queryFn: () => fetchRecentReflections(user!.id, days),
    enabled: !!user,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── useUpsertReflection ──────────────────────────────────────────────────────

/**
 * Mutation to create or update today's reflection.
 *
 * On success:
 *   - Invalidates `today` and `recent` caches so both views refresh.
 *   - Shows a success toast.
 *
 * On error:
 *   - Shows an error toast.
 *   - Rolls back any optimistic updates.
 */
export function useUpsertReflection() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<DailyLog, Error, ReflectionInsertPayload, { previousToday?: DailyLog | null }>({
    mutationFn: (payload) => {
      if (!user) throw new Error("Not authenticated.");
      return upsertReflection(user.id, payload);
    },

    // Optimistic update — immediately reflect saved values in the today cache
    onMutate: async (payload) => {
      if (!user) return {};

      const todayKey = reflectionKeys.today(user.id);

      // Cancel any in-flight refetches to avoid overwriting optimistic data
      await queryClient.cancelQueries({ queryKey: todayKey });

      // Snapshot previous value for rollback
      const previousToday = queryClient.getQueryData<DailyLog | null>(todayKey);

      // Optimistically update the cache
      queryClient.setQueryData<DailyLog | null>(todayKey, (old) => {
        if (!old) return old; // No optimistic update if no entry exists yet
        return { ...old, ...payload };
      });

      return { previousToday };
    },

    onError: (error, _payload, context) => {
      // Roll back on error
      if (user && context?.previousToday !== undefined) {
        queryClient.setQueryData(reflectionKeys.today(user.id), context.previousToday);
      }
      toast.error("Failed to save reflection", { description: error.message });
    },

    onSuccess: () => {
      toast.success("Reflection saved", {
        description: "Your daily log has been recorded.",
      });
    },

    onSettled: () => {
      if (!user) return;
      // Always invalidate on settle so the cache reflects the true server state
      queryClient.invalidateQueries({ queryKey: reflectionKeys.today(user.id) });
      queryClient.invalidateQueries({
        queryKey: reflectionKeys.all(user.id),
        // Invalidate all recent windows, not just the default
        exact: false,
      });
    },
  });
}

// ─── useReflectionInsights ────────────────────────────────────────────────────

/**
 * Derives analytics from recent reflections.
 *
 * Computed entirely client-side from the fetched data — no extra DB roundtrip.
 *
 * Algorithm for topBlocker / topWin:
 *   Split each entry's text on sentence boundaries and newlines, then rank
 *   by a simple word-frequency heuristic. Falls back to the most recent
 *   non-empty entry when frequency is tied.
 */
export function useReflectionInsights(days: number = 7): {
  insights: ReflectionInsights;
  isLoading: boolean;
  isError: boolean;
} {
  const { data: entries = [], isLoading, isError } = useRecentReflections(days);

  const insights = computeInsights(entries);

  return { insights, isLoading, isError };
}

// ─── Pure computation ─────────────────────────────────────────────────────────

function average(nums: number[]): number | null {
  if (nums.length === 0) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

/**
 * Picks the most representative short phrase from a list of free-text entries.
 *
 * Strategy: collect all non-empty entries, split on newlines/periods,
 * trim, deduplicate, then return the most-common one. Falls back to the
 * most-recent non-empty full entry.
 */
function pickTopPhrase(texts: string[]): string | null {
  const nonEmpty = texts.map((t) => t.trim()).filter(Boolean);
  if (nonEmpty.length === 0) return null;

  // Build a frequency map of sentence fragments
  const freq = new Map<string, number>();
  for (const text of nonEmpty) {
    const fragments = text
      .split(/[\n.]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 3 && s.length < 120);
    for (const f of fragments) {
      freq.set(f, (freq.get(f) ?? 0) + 1);
    }
  }

  if (freq.size === 0) return nonEmpty[0]; // fallback: most recent entry

  // Sort by frequency desc, then by length asc (prefer concise phrases)
  const sorted = [...freq.entries()].sort((a, b) => b[1] - a[1] || a[0].length - b[0].length);
  return sorted[0][0];
}

function computeInsights(entries: DailyLog[]): ReflectionInsights {
  if (entries.length === 0) {
    return {
      averageMood: null,
      averageEnergy: null,
      topBlocker: null,
      topWin: null,
      totalEntries: 0,
    };
  }

  return {
    averageMood: average(entries.map((e) => e.mood)),
    averageEnergy: average(entries.map((e) => e.energy)),
    topBlocker: pickTopPhrase(entries.map((e) => e.blockers)),
    topWin: pickTopPhrase(entries.map((e) => e.wins)),
    totalEntries: entries.length,
  };
}
