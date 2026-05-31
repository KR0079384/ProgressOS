import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PageHeader } from "@/components/ui/PageHeader";
import { Check } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · Momentum OS" },
      { name: "description", content: "Themes, profile and system customization." },
    ],
  }),
  component: SettingsPage,
});

const themes = [
  { id: "cyan", name: "Cyan Operative", color: "oklch(0.78 0.15 200)" },
  { id: "violet", name: "Violet Flow", color: "oklch(0.72 0.15 280)" },
  { id: "ember", name: "Ember Strike", color: "oklch(0.74 0.18 50)" },
  { id: "crimson", name: "Crimson Survival", color: "oklch(0.65 0.22 20)" },
  { id: "emerald", name: "Emerald Pulse", color: "oklch(0.74 0.16 160)" },
  { id: "gold", name: "Gold Apex", color: "oklch(0.82 0.14 90)" },
];

function SettingsPage() {
  const [theme, setTheme] = useState("cyan");
  const [survival, setSurvival] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="SYSTEM"
        title="Settings"
        description="Personalize your operating system."
      />

      <div className="grid grid-cols-12 gap-6">
        <section className="col-span-12 lg:col-span-7 glass-panel rounded-3xl p-6">
          <h3 className="font-display text-lg font-bold mb-1">Neon Theme</h3>
          <p className="text-xs text-foreground/50 mb-5">
            Pick the accent that drives your interface.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`relative glass-panel rounded-2xl p-4 text-left transition-all ${
                  theme === t.id ? "border-momentum/50" : ""
                }`}
              >
                <div
                  className="size-10 rounded-xl mb-3"
                  style={{
                    background: t.color,
                    boxShadow: `0 0 18px ${t.color.replace(")", " / 0.5)")}`,
                  }}
                />
                <div className="text-sm font-medium">{t.name}</div>
                {theme === t.id && (
                  <motion.div
                    layoutId="theme-active"
                    className="absolute top-2 right-2 size-5 rounded-full bg-momentum grid place-items-center"
                  >
                    <Check className="size-3 text-background" strokeWidth={3} />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </section>

        <section className="col-span-12 lg:col-span-5 space-y-4">
          <div className="glass-panel rounded-3xl p-6">
            <h3 className="font-display text-lg font-bold mb-4">Profile</h3>
            <div className="flex items-center gap-4 mb-5">
              <div
                className="size-14 rounded-2xl grid place-items-center font-display font-black"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(0.78 0.15 200 / 0.5), oklch(0.72 0.15 280 / 0.5))",
                }}
              >
                AC
              </div>
              <div>
                <div className="font-display font-bold">Alex Chen</div>
                <div className="text-hud text-[10px] text-foreground/40">LVL 14 · 12,450 XP</div>
              </div>
            </div>
            <dl className="grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Streak", value: "14d" },
                { label: "Shipped", value: "248" },
                { label: "Hours", value: "612" },
              ].map((s) => (
                <div key={s.label} className="glass-panel rounded-xl p-3">
                  <dt className="text-hud text-[10px] text-foreground/40">{s.label}</dt>
                  <dd className="font-display font-bold text-lg">{s.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="glass-panel rounded-3xl p-6 space-y-4">
            <h3 className="font-display text-lg font-bold">System</h3>
            <Toggle
              label="Survival Mode"
              hint="Heighten urgency on missed days"
              value={survival}
              onChange={setSurvival}
            />
            <Toggle
              label="Reduce motion"
              hint="Disable ambient animations"
              value={reduceMotion}
              onChange={setReduceMotion}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function Toggle({
  label,
  hint,
  value,
  onChange,
}: {
  label: string;
  hint: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-foreground/50">{hint}</div>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-11 h-6 rounded-full transition-colors ${value ? "bg-momentum" : "bg-white/10"}`}
        aria-pressed={value}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 size-5 rounded-full bg-background shadow"
          animate={{ x: value ? 20 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
    </div>
  );
}
