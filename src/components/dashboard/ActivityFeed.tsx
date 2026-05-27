import { motion } from "framer-motion";
import { activity } from "@/lib/data";

const tagStyle = {
  ship: "text-momentum",
  focus: "text-flow",
  streak: "text-ember",
  level: "text-survival",
} as const;

export function ActivityFeed() {
  return (
    <ul className="space-y-3">
      {activity.map((a, i) => (
        <motion.li
          key={a.id}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05 * i }}
          className="flex items-start gap-3 group"
        >
          <div className="flex flex-col items-center pt-1">
            <div className={`size-2 rounded-full ${tagStyle[a.tag] === "text-momentum" ? "bg-momentum" : tagStyle[a.tag] === "text-flow" ? "bg-flow" : tagStyle[a.tag] === "text-ember" ? "bg-ember" : "bg-survival"}`} />
            {i < activity.length - 1 && <div className="w-px flex-1 bg-glass-border mt-1 h-8" />}
          </div>
          <div className="flex-1 pb-2">
            <p className="text-sm text-foreground/80">{a.text}</p>
            <span className="text-hud text-[10px] text-foreground/40">{a.time}</span>
          </div>
        </motion.li>
      ))}
    </ul>
  );
}
