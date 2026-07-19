/**
 * components/reflection/ReflectionForm.tsx
 *
 * Presentational form for daily reflections.
 *
 * Data responsibilities are delegated entirely to hooks:
 *   - useTodayReflection  → pre-populates existing data on mount
 *   - useUpsertReflection → handles save, toast feedback, and cache update
 *
 * This component owns only local UI state (controlled inputs).
 */

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useTodayReflection, useUpsertReflection } from "@/hooks/useReflections";

// ─── Constants ────────────────────────────────────────────────────────────────

const MOODS = [
  { value: 1, emoji: "😞", label: "Bad" },
  { value: 2, emoji: "😐", label: "Okay" },
  { value: 3, emoji: "🙂", label: "Good" },
  { value: 4, emoji: "😄", label: "Great" },
  { value: 5, emoji: "🚀", label: "Excellent" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ReflectionForm() {
  // ── Data hooks ──────────────────────────────────────────────────────────────
  const { data: todayReflection, isLoading: isLoadingToday } = useTodayReflection();
  const upsert = useUpsertReflection();

  // ── Controlled form state ───────────────────────────────────────────────────
  const [mood, setMood] = useState<number>(3);
  const [energy, setEnergy] = useState<number[]>([3]);
  const [wins, setWins] = useState("");
  const [blockers, setBlockers] = useState("");
  const [notes, setNotes] = useState("");

  // ── Pre-populate from existing today's reflection ───────────────────────────
  useEffect(() => {
    if (!todayReflection) return;
    setMood(todayReflection.mood);
    setEnergy([todayReflection.energy]);
    setWins(todayReflection.wins ?? "");
    setBlockers(todayReflection.blockers ?? "");
    setNotes(todayReflection.notes ?? "");
  }, [todayReflection]);

  // ── Submit ──────────────────────────────────────────────────────────────────
  const handleSubmit = () => {
    upsert.mutate({
      mood,
      energy: energy[0],
      wins,
      blockers,
      notes,
    });
  };

  const isSaving = upsert.isPending;
  const isExistingEntry = !!todayReflection;

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold">Daily Reflection</CardTitle>

        {isExistingEntry && (
          <span className="text-hud text-[10px] text-momentum">ENTRY SAVED TODAY</span>
        )}
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Loading skeleton while fetching today's entry */}
        {isLoadingToday ? (
          <div className="space-y-4 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-white/5" />
            ))}
          </div>
        ) : (
          <>
            {/* Mood */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                How was today?
              </h3>

              <div className="flex gap-2 flex-wrap">
                {MOODS.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => setMood(item.value)}
                    disabled={isSaving}
                    aria-label={`Mood: ${item.label}`}
                    aria-pressed={mood === item.value}
                    className={`flex flex-col items-center rounded-xl px-4 py-3 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 ${
                      mood === item.value
                        ? "bg-primary text-primary-foreground shadow-[0_0_16px_-2px_oklch(0.78_0.15_200/0.5)]"
                        : "bg-muted hover:bg-muted/70"
                    }`}
                  >
                    <span className="text-2xl">{item.emoji}</span>
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Energy */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Energy Level
              </h3>

              <Slider
                min={1}
                max={5}
                step={1}
                value={energy}
                onValueChange={setEnergy}
                disabled={isSaving}
                aria-label="Energy level"
              />

              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>Drained</span>
                <span className="font-semibold text-foreground">{energy[0]} / 5</span>
                <span>Peak</span>
              </div>
            </div>

            {/* Wins */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Biggest Win
              </h3>

              <Textarea
                id="reflection-wins"
                value={wins}
                onChange={(e) => setWins(e.target.value)}
                placeholder="What went well today?"
                rows={4}
                disabled={isSaving}
              />
            </div>

            {/* Blockers */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Biggest Blocker
              </h3>

              <Textarea
                id="reflection-blockers"
                value={blockers}
                onChange={(e) => setBlockers(e.target.value)}
                placeholder="What slowed you down?"
                rows={4}
                disabled={isSaving}
              />
            </div>

            {/* Notes */}
            <div>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                Additional Notes
              </h3>

              <Textarea
                id="reflection-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Anything else worth remembering?"
                rows={4}
                disabled={isSaving}
              />
            </div>

            {/* Submit */}
            <Button
              id="reflection-submit"
              className="w-full"
              onClick={handleSubmit}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving…
                </>
              ) : isExistingEntry ? (
                "Update Reflection"
              ) : (
                "Save Reflection"
              )}
            </Button>

            {/* Error state */}
            {upsert.isError && (
              <p className="text-sm text-destructive text-center" role="alert">
                {upsert.error?.message ?? "Something went wrong. Please try again."}
              </p>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
