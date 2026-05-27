export function AmbientGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
      <div
        className="absolute -top-[20%] -left-[10%] size-[800px] rounded-full animate-[glow-pulse_8s_ease-in-out_infinite]"
        style={{ background: "oklch(0.78 0.15 200 / 0.12)", filter: "blur(120px)" }}
      />
      <div
        className="absolute -bottom-[20%] -right-[10%] size-[800px] rounded-full animate-[glow-pulse_10s_ease-in-out_infinite_2s]"
        style={{ background: "oklch(0.65 0.22 20 / 0.10)", filter: "blur(120px)" }}
      />
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 size-[600px] rounded-full animate-[glow-pulse_14s_ease-in-out_infinite_1s]"
        style={{ background: "oklch(0.72 0.15 280 / 0.08)", filter: "blur(140px)" }}
      />
      {/* subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.5) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
        }}
      />
    </div>
  );
}
