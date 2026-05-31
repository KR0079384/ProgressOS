import { motion } from "framer-motion";

export function SurvivalIndicator({ active }: { active: boolean }) {
  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${
        active ? "bg-survival/15 border-survival/40" : "bg-white/5 border-glass-border"
      }`}
    >
      <motion.span
        animate={active ? { opacity: [1, 0.3, 1], scale: [1, 1.4, 1] } : { opacity: 0.4 }}
        transition={{ duration: 1.6, repeat: Infinity }}
        className={`size-1.5 rounded-full ${active ? "bg-survival" : "bg-foreground/30"}`}
        style={active ? { boxShadow: "0 0 8px oklch(0.65 0.22 20 / 0.8)" } : undefined}
      />
      <span
        className={`text-hud text-[10px] font-bold ${active ? "text-survival" : "text-foreground/50"}`}
      >
        {active ? "Survival Mode Active" : "Standard Mode"}
      </span>
    </div>
  );
}
