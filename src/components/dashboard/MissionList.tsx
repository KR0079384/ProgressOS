import { motion } from "framer-motion";
import { Check, Flame } from "lucide-react";
import { useState } from "react";
import type { Mission } from "@/lib/data";

interface MissionListProps {
  initial: Mission[];
}

const priorityClass: Record<string, string> = {
  P1: "text-survival border-survival/40 bg-survival/10",
  P2: "text-momentum border-momentum/40 bg-momentum/10",
  P3: "text-foreground/60 border-glass-border bg-white/5",
};

export function MissionList({ initial }: MissionListProps) {
  const [missions, setMissions] = useState(initial);

  function toggle(id: string) {
    setMissions((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: m.status === "done" ? "todo" : "done" } : m)),
    );
  }

  return (
    <ul className="space-y-3">
      {missions.map((m, i) => {
        const done = m.status === "done";
        return (
          <motion.li
            key={m.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.05 * i, duration: 0.4 }}
          >
            <button
              onClick={() => toggle(m.id)}
              className={`w-full glass-panel rounded-2xl p-4 flex items-center gap-4 group hover:border-momentum/40 transition-all text-left ${
                done ? "opacity-50" : ""
              } ${m.status === "active" ? "border-momentum/30 bg-momentum/[0.04]" : ""}`}
            >
              <div
                className={`size-5 rounded-md border flex items-center justify-center shrink-0 transition-all ${
                  done
                    ? "bg-momentum border-momentum"
                    : "border-foreground/30 group-hover:border-momentum"
                }`}
              >
                {done && <Check className="size-3 text-background" strokeWidth={3} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-medium truncate ${done ? "line-through" : ""}`}>
                  {m.title}
                </div>
                <div className="text-hud text-[10px] text-foreground/40 mt-0.5 flex items-center gap-2">
                  <span>{m.project}</span>
                  <span className="text-foreground/20">·</span>
                  <span>{m.duration}</span>
                  <span className="text-foreground/20">·</span>
                  <span>+{m.xp} XP</span>
                </div>
              </div>
              {m.survival && !done && (
                <Flame className="size-3.5 text-survival animate-pulse" />
              )}
              <span
                className={`text-hud text-[10px] px-2 py-0.5 rounded-full border ${
                  priorityClass[m.priority]
                }`}
              >
                {m.priority}
              </span>
            </button>
          </motion.li>
        );
      })}
    </ul>
  );
}
