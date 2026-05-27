import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Activity, BarChart3, Crosshair, Layers, Settings, Sparkles, Target, Trophy } from "lucide-react";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const commands = [
  { icon: Activity, label: "Open Dashboard", to: "/", hint: "G then D" },
  { icon: Target, label: "Today's Missions", to: "/missions", hint: "G then M" },
  { icon: Layers, label: "Projects", to: "/projects", hint: "G then P" },
  { icon: Crosshair, label: "Enter Focus Hub", to: "/focus", hint: "F" },
  { icon: BarChart3, label: "Analytics", to: "/analytics", hint: "G then A" },
  { icon: Trophy, label: "Achievements", to: "/achievements", hint: "G then T" },
  { icon: Settings, label: "Settings", to: "/settings", hint: "," },
  { icon: Sparkles, label: "Toggle Survival Mode", to: "/", hint: "⌥ S" },
] as const;

export function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -12, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
            className="relative w-full max-w-xl glass-panel-strong rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-glass-border">
              <span className="text-hud text-[10px] text-momentum">CMD</span>
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command or search…"
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-foreground/40"
              />
              <kbd className="text-[10px] font-mono text-foreground/40">ESC</kbd>
            </div>
            <ul className="max-h-[50vh] overflow-y-auto py-2">
              {filtered.length === 0 && (
                <li className="px-4 py-6 text-sm text-foreground/40 text-center">No commands.</li>
              )}
              {filtered.map((c) => (
                <li key={c.label}>
                  <button
                    onClick={() => {
                      navigate({ to: c.to });
                      onClose();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-white/5 text-left transition-colors"
                  >
                    <c.icon className="size-4 text-momentum" />
                    <span className="text-sm flex-1">{c.label}</span>
                    <span className="text-hud text-[10px] text-foreground/40">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
