import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { AchievementsRow } from "@/components/dashboard/AchievementsRow";
import { achievements } from "@/lib/data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements · Momentum OS" },
      { name: "description", content: "Ranks, XP, streak preservation and unlocks." },
    ],
  }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const ranks = [
    { name: "Recruit", xp: 0, unlocked: true },
    { name: "Operator", xp: 2000, unlocked: true },
    { name: "Specialist", xp: 5000, unlocked: true },
    { name: "Tactical Operative", xp: 8000, unlocked: true, current: true },
    { name: "Architect", xp: 13000, unlocked: false },
    { name: "Grandmaster", xp: 20000, unlocked: false },
  ];

  return (
    <div>
      <PageHeader
        eyebrow="RANK · LEVEL 14"
        title="Achievements"
        description="Proof of consistency, etched permanently."
      />

      <div className="glass-panel rounded-3xl p-6 md:p-8 mb-8 relative overflow-hidden">
        <div
          className="absolute -top-32 -right-32 size-80 rounded-full"
          style={{ background: "oklch(0.78 0.15 200 / 0.25)", filter: "blur(80px)" }}
        />
        <div className="relative">
          <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between mb-6">
            <div>
              <div className="text-hud text-[10px] text-momentum">CURRENT RANK</div>
              <div className="font-display text-3xl font-bold">Tactical Operative</div>
              <div className="text-sm text-foreground/50 mt-1">12,450 / 13,000 XP to Architect</div>
            </div>
            <div className="text-right">
              <div className="font-display text-5xl font-black text-momentum">96%</div>
              <div className="text-hud text-[10px] text-foreground/40">PROGRESS</div>
            </div>
          </div>
          <div className="relative h-3 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "96%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-gradient-to-r from-momentum to-flow"
              style={{ boxShadow: "0 0 12px oklch(0.78 0.15 200 / 0.6)" }}
            />
          </div>
          <ol className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-3">
            {ranks.map((r) => (
              <li
                key={r.name}
                className={`relative glass-panel rounded-xl p-3 text-center ${
                  r.current ? "border-momentum/50 bg-momentum/5" : ""
                } ${r.unlocked ? "" : "opacity-40"}`}
              >
                <div className="text-hud text-[9px] text-foreground/40">
                  {r.xp.toLocaleString()} XP
                </div>
                <div className={`text-xs font-medium mt-1 ${r.current ? "text-momentum" : ""}`}>
                  {r.name}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mb-4 text-hud text-[10px] text-foreground/40">EARNED · LOCKED</div>
      <AchievementsRow items={achievements} />
    </div>
  );
}
