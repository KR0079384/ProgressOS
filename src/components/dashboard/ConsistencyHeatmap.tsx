import { motion } from "framer-motion";
import { heatmap } from "@/lib/data";

const days = ["M", "T", "W", "T", "F", "S", "S"];

function shade(v: number) {
  if (v === 0) return "oklch(1 0 0 / 0.04)";
  const alpha = 0.2 + v * 0.18;
  return `oklch(0.78 0.15 200 / ${alpha})`;
}

export function ConsistencyHeatmap() {
  return (
    <div>
      <div className="flex gap-1.5">
        <div className="flex flex-col gap-1.5 mr-1 pt-0">
          {days.map((d, i) => (
            <div
              key={i}
              className="h-3 flex items-center text-[9px] font-mono text-foreground/30 w-3"
            >
              {i % 2 === 0 ? d : ""}
            </div>
          ))}
        </div>
        <div className="flex-1 grid grid-flow-col auto-cols-fr gap-1.5">
          {heatmap.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1.5">
              {week.map((v, di) => (
                <motion.div
                  key={di}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: (wi * 7 + di) * 0.005, duration: 0.3 }}
                  whileHover={{ scale: 1.4, zIndex: 2 }}
                  className="h-3 rounded-[3px] border border-white/5"
                  style={{
                    background: shade(v),
                    boxShadow: v >= 3 ? "0 0 6px oklch(0.78 0.15 200 / 0.4)" : "none",
                  }}
                  title={`Intensity ${v}/4`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] font-mono text-foreground/40">
        <span>12 weeks</span>
        <div className="flex items-center gap-1.5">
          <span>LESS</span>
          {[0, 1, 2, 3, 4].map((v) => (
            <div key={v} className="size-2.5 rounded-sm" style={{ background: shade(v) }} />
          ))}
          <span>MORE</span>
        </div>
      </div>
    </div>
  );
}
