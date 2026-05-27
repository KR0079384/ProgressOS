import { motion } from "framer-motion";

interface MomentumRingProps {
  score: number;
  label?: string;
  size?: number;
}

export function MomentumRing({ score, label = "Score", size = 192 }: MomentumRingProps) {
  const r = 80;
  const c = 2 * Math.PI * r;
  const offset = c - (c * score) / 100;

  return (
    <div className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 192 192">
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="oklch(0.78 0.15 200)" />
            <stop offset="100%" stopColor="oklch(0.72 0.15 280)" />
          </linearGradient>
        </defs>
        <circle cx="96" cy="96" r={r} stroke="oklch(1 0 0 / 0.06)" strokeWidth="10" fill="none" />
        <motion.circle
          cx="96"
          cy="96"
          r={r}
          stroke="url(#ringGrad)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.15 200 / 0.5))" }}
        />
      </svg>
      <div className="relative text-center">
        <motion.span
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="block font-display text-5xl font-black tracking-tighter"
        >
          {score}
        </motion.span>
        <span className="text-hud text-[10px] text-momentum mt-1 block">{label}</span>
      </div>
    </div>
  );
}
