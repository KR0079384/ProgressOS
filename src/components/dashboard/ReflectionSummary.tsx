/**
 * components/dashboard/ReflectionSummary.tsx
 *
 * Compact dashboard widget for the Reflection System.
 *
 * Shows one of three states:
 *   1. Loading  → skeleton
 *   2. No entry → CTA prompting the user to complete today's reflection
 *   3. Entry exists → today's mood, energy, and a summary snippet
 */

import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Zap } from "lucide-react";

import { useTodayReflection } from "@/hooks/useReflections";

// ─── Mood label map ───────────────────────────────────────────────────────────

const MOOD_LABELS: Record<number, { emoji: string; label: string }> = {
  1: { emoji: "😞", label: "Bad" },
  2: { emoji: "😐", label: "Okay" },
  3: { emoji: "🙂", label: "Good" },
  4: { emoji: "😄", label: "Great" },
  5: { emoji: "🚀", label: "Excellent" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function ReflectionSummary() {
  const { data: todayReflection, isLoading } = useTodayReflection();

  // ── Loading state ───────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="glass-panel rounded-3xl p-6 space-y-4 animate-pulse">
        <div className="h-4 w-32 rounded-lg bg-white/5" />
        <div className="h-8 w-48 rounded-lg bg-white/5" />
        <div className="grid grid-cols-2 gap-3">
          <div className="h-14 rounded-xl bg-white/5" />
          <div className="h-14 rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  // ── No entry: call to action ────────────────────────────────────────────────
  if (!todayReflection) {
    return (
      <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-xl bg-momentum/10 grid place-items-center text-momentum">
            <BookOpen className="size-4" />
          </div>
          <div>
            <div className="text-hud text-[10px] text-foreground/40">DAILY REFLECTION</div>
            <h3 className="font-display text-base font-bold">Log Today's Progress</h3>
          </div>
        </div>

        <p className="text-sm text-foreground/60 leading-relaxed">
          You haven't reflected today. Take 2 minutes to log your mood,
          energy, and what moved the needle.
        </p>

        <Link
          to="/reflect"
          className="inline-flex items-center gap-2 text-sm font-semibold text-momentum hover:underline underline-offset-2 group"
        >
          Start Reflection
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    );
  }

  // ── Entry exists: show summary ──────────────────────────────────────────────
  const moodInfo = MOOD_LABELS[todayReflection.mood] ?? { emoji: "🙂", label: "Good" };

  return (
    <div className="glass-panel rounded-3xl p-6 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-hud text-[10px] text-foreground/40">TODAY'S REFLECTION</div>
          <h3 className="font-display text-base font-bold mt-0.5">
            Logged &amp; Recorded
          </h3>
        </div>
        <span className="text-hud text-[10px] text-momentum">✓ DONE</span>
      </div>

      {/* Mood + Energy */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-muted/30 p-3 flex items-center gap-3">
          <span className="text-2xl" role="img" aria-label={`Mood: ${moodInfo.label}`}>
            {moodInfo.emoji}
          </span>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">
              Mood
            </p>
            <p className="text-sm font-semibold">{moodInfo.label}</p>
          </div>
        </div>

        <div className="rounded-xl bg-muted/30 p-3 flex items-center gap-3">
          <div className="size-8 rounded-lg bg-flow/10 grid place-items-center text-flow">
            <Zap className="size-3.5" />
          </div>
          <div>
            <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide">
              Energy
            </p>
            <p className="text-sm font-semibold">{todayReflection.energy} / 5</p>
          </div>
        </div>
      </div>

      {/* Win snippet */}
      {todayReflection.wins?.trim() && (
        <div className="rounded-xl bg-muted/20 px-4 py-3">
          <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-wide mb-1">
            Today's Win
          </p>
          <p className="text-sm text-foreground/80 line-clamp-2 leading-relaxed">
            {todayReflection.wins}
          </p>
        </div>
      )}

      {/* Edit link */}
      <Link
        to="/reflect"
        className="inline-flex items-center gap-2 text-xs font-medium text-foreground/40 hover:text-momentum transition-colors group"
      >
        Edit reflection
        <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
