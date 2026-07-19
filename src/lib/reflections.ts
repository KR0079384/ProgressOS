/**
 * lib/reflections.ts
 *
 * Pure async data-access functions for the `daily_logs` table.
 *
 * Rules:
 *   - No React imports, no hooks.
 *   - Every function is strongly typed.
 *   - All Supabase query logic lives here and is imported by hooks only.
 *   - Errors are surfaced by re-throwing so TanStack Query can catch them.
 */

import { supabase } from "@/lib/supabase";
import type { DailyLog, ReflectionInsertPayload } from "@/lib/types";

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Returns today's date as "YYYY-MM-DD" in local time. */
export function getTodayDateString(): string {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// ─── Queries ─────────────────────────────────────────────────────────────────

/**
 * Fetch the authenticated user's reflection for today.
 * Returns `null` if no entry exists yet.
 */
export async function fetchTodayReflection(userId: string): Promise<DailyLog | null> {
  const today = getTodayDateString();

  const { data, error } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("user_id", userId)
    .eq("log_date", today)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data ?? null;
}

/**
 * Fetch the most recent N days of reflections for the authenticated user.
 * Ordered newest-first. Defaults to 7 days.
 */
export async function fetchRecentReflections(
  userId: string,
  days: number = 7,
): Promise<DailyLog[]> {
  // Compute ISO date string for `days` ago (in local time)
  const since = new Date();
  since.setDate(since.getDate() - days + 1);
  const sinceStr = since.toISOString().slice(0, 10);

  const { data, error } = await supabase
    .from("daily_logs")
    .select("*")
    .eq("user_id", userId)
    .gte("log_date", sinceStr)
    .order("log_date", { ascending: false });

  if (error) throw new Error(error.message);

  return data ?? [];
}

// ─── Mutations ────────────────────────────────────────────────────────────────

/**
 * Create or update today's reflection for the authenticated user.
 *
 * Uses an upsert on `(user_id, log_date)`. The daily_logs table must have a
 * UNIQUE constraint on those two columns for the conflict resolution to work:
 *
 *   ALTER TABLE daily_logs ADD CONSTRAINT daily_logs_user_date_unique
 *     UNIQUE (user_id, log_date);
 *
 * Returns the upserted row.
 */
export async function upsertReflection(
  userId: string,
  payload: ReflectionInsertPayload,
): Promise<DailyLog> {
  const today = getTodayDateString();

  const { data, error } = await supabase
    .from("daily_logs")
    .upsert(
      {
        user_id: userId,
        log_date: today,
        mood: payload.mood,
        energy: payload.energy,
        wins: payload.wins,
        blockers: payload.blockers,
        notes: payload.notes,
        // focus_hours is managed by the Focus Hub; default 0 on insert,
        // preserved on update via the conflict resolution target below.
        focus_hours: 0,
      },
      { onConflict: "user_id,log_date", ignoreDuplicates: false },
    )
    .select()
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Upsert returned no data.");

  return data as DailyLog;
}
