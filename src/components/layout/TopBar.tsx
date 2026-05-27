import { Bell, Command, Flame, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface TopBarProps {
  onOpenCommand: () => void;
}

export function TopBar({ onOpenCommand }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 h-16 glass-panel border-b border-glass-border px-4 md:px-8 flex items-center justify-between">
      <button
        onClick={onOpenCommand}
        className="group flex items-center gap-3 px-3 py-1.5 rounded-lg border border-glass-border bg-white/5 hover:bg-white/10 transition-colors min-w-[260px]"
      >
        <Command className="size-3.5 text-foreground/40 group-hover:text-momentum transition-colors" />
        <span className="text-xs font-medium text-foreground/60 flex-1 text-left">
          Search · Run command…
        </span>
        <kbd className="text-hud text-[10px] text-foreground/40 px-1.5 py-0.5 rounded border border-glass-border bg-black/20">
          ⌘K
        </kbd>
      </button>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="hidden sm:flex items-center gap-2">
          <Flame className="size-3.5 text-ember" />
          <span className="text-hud text-[11px] font-bold">14 Day Streak</span>
        </div>
        <div className="hidden md:block h-6 w-px bg-glass-border" />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="size-9 grid place-items-center rounded-xl border border-glass-border bg-white/5 hover:bg-white/10 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="size-4 text-foreground/70" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="size-9 grid place-items-center rounded-xl bg-momentum text-background"
          style={{ boxShadow: "var(--shadow-glow-accent)" }}
          aria-label="New mission"
        >
          <Plus className="size-4" strokeWidth={2.5} />
        </motion.button>
        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block">
            <div className="text-xs font-bold font-display leading-tight">Alex Chen</div>
            <div className="text-hud text-[10px] text-foreground/40">12,450 XP</div>
          </div>
          <div
            className="size-9 rounded-xl border border-glass-border grid place-items-center text-xs font-bold font-display"
            style={{
              background: "linear-gradient(135deg, oklch(0.78 0.15 200 / 0.4), oklch(0.72 0.15 280 / 0.4))",
            }}
          >
            AC
          </div>
        </div>
      </div>
    </header>
  );
}
