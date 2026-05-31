import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { PageHeader } from "@/components/ui/PageHeader";
import { missions as seed, type Mission, type MissionStatus } from "@/lib/data";
import { Flame, Plus } from "lucide-react";

export const Route = createFileRoute("/missions")({
  head: () => ({
    meta: [
      { title: "Missions · Momentum OS" },
      { name: "description", content: "Plan, prioritize and ship your daily missions." },
    ],
  }),
  component: MissionsPage,
});

const columns: { key: MissionStatus; title: string; eyebrow: string }[] = [
  { key: "todo", title: "Queued", eyebrow: "STAGED" },
  { key: "active", title: "In Flight", eyebrow: "FOCUS NOW" },
  { key: "done", title: "Shipped", eyebrow: "PROOF" },
];

const priorityClass: Record<string, string> = {
  P1: "text-survival border-survival/40 bg-survival/10",
  P2: "text-momentum border-momentum/40 bg-momentum/10",
  P3: "text-foreground/60 border-glass-border bg-white/5",
};

function MissionCard({ m, onMove }: { m: Mission; onMove: (id: string, dir: 1 | -1) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -2 }}
      className="glass-panel rounded-2xl p-4 group"
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className={`text-hud text-[10px] px-2 py-0.5 rounded-full border ${priorityClass[m.priority]}`}
        >
          {m.priority}
        </span>
        {m.survival && <Flame className="size-3.5 text-survival" />}
      </div>
      <div className="text-sm font-medium leading-snug">{m.title}</div>
      <div className="text-hud text-[10px] text-foreground/40 mt-2">
        {m.project} · {m.duration} · +{m.xp} XP
      </div>
      <div className="mt-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onMove(m.id, -1)}
          className="text-[10px] font-mono text-foreground/50 hover:text-foreground px-2 py-1 rounded-md border border-glass-border"
        >
          ← Back
        </button>
        <button
          onClick={() => onMove(m.id, 1)}
          className="text-[10px] font-mono text-momentum hover:text-foreground px-2 py-1 rounded-md border border-momentum/30 bg-momentum/10"
        >
          Advance →
        </button>
      </div>
    </motion.div>
  );
}

function MissionsPage() {
  const [items, setItems] = useState<Mission[]>(seed);

  const move = (id: string, dir: 1 | -1) => {
    setItems((prev) =>
      prev.map((m) => {
        if (m.id !== id) return m;
        const order: MissionStatus[] = ["todo", "active", "done"];
        const idx = order.indexOf(m.status);
        const nextIdx = Math.max(0, Math.min(order.length - 1, idx + dir));
        return { ...m, status: order[nextIdx] };
      }),
    );
  };

  return (
    <div>
      <PageHeader
        eyebrow="OPERATIONS"
        title="Missions"
        description="Drag, advance, complete. Each shipped mission compounds your momentum."
        action={
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-momentum text-background font-bold text-sm"
            style={{ boxShadow: "var(--shadow-glow-accent)" }}
          >
            <Plus className="size-4" strokeWidth={2.5} /> New Mission
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {columns.map((col) => {
          const colMissions = items.filter((m) => m.status === col.key);
          return (
            <div key={col.key} className="glass-panel rounded-3xl p-4 min-h-[60vh]">
              <div className="flex items-center justify-between mb-4 px-2">
                <div>
                  <div className="text-hud text-[10px] text-momentum">{col.eyebrow}</div>
                  <h3 className="font-display font-bold">{col.title}</h3>
                </div>
                <span className="text-hud text-[10px] text-foreground/40">
                  {colMissions.length.toString().padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-3">
                {colMissions.map((m) => (
                  <MissionCard key={m.id} m={m} onMove={move} />
                ))}
                {colMissions.length === 0 && (
                  <div className="text-center py-12 text-xs text-foreground/40 border border-dashed border-glass-border rounded-2xl">
                    Empty lane. Stay sharp.
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
