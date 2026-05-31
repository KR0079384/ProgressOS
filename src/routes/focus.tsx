import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Pause, Play, RotateCcw } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";

export const Route = createFileRoute("/focus")({
  head: () => ({
    meta: [
      { title: "Focus Hub · Momentum OS" },
      { name: "description", content: "Distraction-free deep work timer." },
    ],
  }),
  component: FocusPage,
});

const DURATION = 50 * 60;

function FocusPage() {
  const [remaining, setRemaining] = useState(DURATION);
  const [running, setRunning] = useState(false);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setRemaining((r) => Math.max(0, r - 1));
      }, 1000);
    } else if (interval.current) {
      clearInterval(interval.current);
      interval.current = null;
    }
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [running]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const pct = ((DURATION - remaining) / DURATION) * 100;
  const r = 140;
  const c = 2 * Math.PI * r;
  const offset = c - (c * pct) / 100;

  return (
    <div>
      <PageHeader
        eyebrow="DEEP WORK"
        title="Focus Hub"
        description="Lock in. Everything else can wait fifty minutes."
      />
      <div className="glass-panel rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 -z-0"
          animate={{ opacity: running ? [0.4, 0.7, 0.4] : 0.3 }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.78 0.15 200 / 0.18) 0%, transparent 60%)",
          }}
        />
        <div className="relative flex flex-col items-center">
          <div className="relative" style={{ width: 360, height: 360, maxWidth: "100%" }}>
            <svg viewBox="0 0 320 320" className="w-full h-full -rotate-90">
              <circle
                cx="160"
                cy="160"
                r={r}
                stroke="oklch(1 0 0 / 0.06)"
                strokeWidth="6"
                fill="none"
              />
              <motion.circle
                cx="160"
                cy="160"
                r={r}
                stroke="oklch(0.78 0.15 200)"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={c}
                animate={{ strokeDashoffset: offset }}
                transition={{ duration: 1, ease: "linear" }}
                style={{ filter: "drop-shadow(0 0 10px oklch(0.78 0.15 200 / 0.6))" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-hud text-[10px] text-momentum mb-2">SESSION · 50 MIN</div>
              <div className="font-display text-7xl md:text-8xl font-black tracking-tighter tabular-nums">
                {mins.toString().padStart(2, "0")}:{secs.toString().padStart(2, "0")}
              </div>
              <div className="text-hud text-[10px] text-foreground/40 mt-3">
                {running ? "IN FLOW" : "READY"}
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <button
              onClick={() => setRunning((r) => !r)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-momentum text-background font-bold"
              style={{ boxShadow: "var(--shadow-glow-accent)" }}
            >
              {running ? <Pause className="size-4" /> : <Play className="size-4" />}
              {running ? "Pause" : "Begin Session"}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setRemaining(DURATION);
              }}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl border border-glass-border bg-white/5 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              <RotateCcw className="size-4" /> Reset
            </button>
          </div>

          <div className="mt-10 text-center text-xs text-foreground/40 max-w-[40ch]">
            Notifications muted. Survival mode armed. One block at a time.
          </div>
        </div>
      </div>
    </div>
  );
}
