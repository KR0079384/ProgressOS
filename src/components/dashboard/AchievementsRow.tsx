import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import type { Achievement } from "@/lib/data";

const tones = {
  momentum: "oklch(0.78 0.15 200)",
  flow: "oklch(0.72 0.15 280)",
  ember: "oklch(0.74 0.18 50)",
  neutral: "oklch(0.6 0.02 260)",
} as const;

export function AchievementsRow({ items }: { items: Achievement[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
      {items.map((a, i) => {
        const color = tones[a.tone];
        return (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
            whileHover={{ y: -3, scale: 1.04 }}
            className={`shrink-0 w-32 rounded-2xl glass-panel p-4 flex flex-col items-center gap-2 group relative overflow-hidden ${
              a.earned ? "" : "opacity-40"
            }`}
            title={a.name}
          >
            {a.earned && (
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: `radial-gradient(circle at center, ${color} 0%, transparent 60%)`,
                }}
              />
            )}
            <div
              className="relative size-12 rounded-full border grid place-items-center text-xs font-bold font-display"
              style={{
                borderColor: a.earned ? color : "oklch(1 0 0 / 0.1)",
                background: a.earned ? `${color.replace(")", " / 0.15)")}` : "transparent",
                color: a.earned ? color : "oklch(0.6 0.02 260)",
                boxShadow: a.earned ? `0 0 16px ${color.replace(")", " / 0.35)")}` : "none",
              }}
            >
              {a.earned ? a.code : <Lock className="size-4" />}
            </div>
            <span className="relative text-[10px] text-center text-foreground/60 leading-tight">
              {a.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
