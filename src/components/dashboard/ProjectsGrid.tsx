import { motion } from "framer-motion";
import { Box, Cpu, FileText, Layers } from "lucide-react";
import type { Project } from "@/lib/data";

const toneMap = {
  momentum: {
    color: "oklch(0.78 0.15 200)",
    bg: "bg-momentum/10",
    border: "border-momentum/30",
    text: "text-momentum",
  },
  flow: {
    color: "oklch(0.72 0.15 280)",
    bg: "bg-flow/10",
    border: "border-flow/30",
    text: "text-flow",
  },
  ember: {
    color: "oklch(0.74 0.18 50)",
    bg: "bg-ember/10",
    border: "border-ember/30",
    text: "text-ember",
  },
  neutral: {
    color: "oklch(0.7 0.02 260)",
    bg: "bg-white/5",
    border: "border-glass-border",
    text: "text-foreground/60",
  },
} as const;

const icons = [Box, Cpu, FileText, Layers];

export function ProjectsGrid({
  projects,
  compact = false,
}: {
  projects: Project[];
  compact?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 ${compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2"}`}
    >
      {projects.map((p, i) => {
        const tone = toneMap[p.tone];
        const Icon = icons[i % icons.length];
        const pct = Math.round((p.done / p.total) * 100);
        return (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            whileHover={{ y: -3 }}
            className="glass-panel rounded-2xl p-5 relative overflow-hidden group cursor-pointer"
          >
            <div
              className="absolute -top-16 -right-16 size-40 rounded-full opacity-30 group-hover:opacity-60 transition-opacity"
              style={{ background: tone.color, filter: "blur(60px)" }}
            />
            <div className="relative">
              <div
                className={`size-10 rounded-xl ${tone.bg} ${tone.border} border grid place-items-center ${tone.text}`}
              >
                <Icon className="size-4" />
              </div>
              <h4 className="mt-4 font-display font-bold">{p.name}</h4>
              <p className="text-xs text-foreground/50 mt-1">{p.description}</p>

              <div className="mt-5">
                <div className="flex items-center justify-between text-hud text-[10px] mb-1.5">
                  <span className="text-foreground/40">
                    {p.done} / {p.total} tasks
                  </span>
                  <span className={tone.text}>{pct}%</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{ background: tone.color }}
                  />
                </div>
              </div>

              {!compact && (
                <ul className="mt-5 space-y-2">
                  {p.milestones.map((ms, mi) => (
                    <li key={mi} className="flex items-center gap-2 text-xs">
                      <div
                        className={`size-1.5 rounded-full ${ms.done ? "" : "bg-white/15"}`}
                        style={ms.done ? { background: tone.color } : undefined}
                      />
                      <span className={ms.done ? "text-foreground/70" : "text-foreground/40"}>
                        {ms.label}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
