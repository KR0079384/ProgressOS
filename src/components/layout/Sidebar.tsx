import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { navItems } from "@/lib/data";
import { Hexagon } from "lucide-react";

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col glass-panel border-r border-glass-border z-30 sticky top-0 h-screen">
      <Link to="/" className="p-6 flex items-center gap-3 group">
        <motion.div
          whileHover={{ rotate: 90, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className="size-9 rounded-lg bg-momentum grid place-items-center"
          style={{ boxShadow: "var(--shadow-glow-accent)" }}
        >
          <Hexagon className="size-4 text-background" strokeWidth={2.5} />
        </motion.div>
        <div className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight">MOMENTUM</span>
          <span className="text-hud text-[9px] text-momentum mt-1">OS · v1.4</span>
        </div>
      </Link>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground/55 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 rounded-xl bg-white/10 border border-glass-border"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span
                className={`relative text-hud text-[10px] ${
                  active ? "text-momentum" : "text-foreground/35"
                }`}
              >
                {item.code}
              </span>
              <span className={`relative text-sm font-medium ${active ? "text-foreground" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-glass-border">
        <div className="relative overflow-hidden p-4 rounded-2xl bg-momentum/5 border border-momentum/20">
          <div
            className="absolute -top-12 -right-12 size-24 rounded-full"
            style={{ background: "oklch(0.78 0.15 200 / 0.25)", filter: "blur(30px)" }}
          />
          <div className="text-hud text-[10px] text-momentum mb-1">Level 14</div>
          <div className="text-xs font-medium mb-3">Tactical Operative</div>
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "65%" }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="h-full bg-momentum"
              style={{ boxShadow: "0 0 8px oklch(0.78 0.15 200 / 0.7)" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-[10px] font-mono text-foreground/50">
            <span>8,450 XP</span>
            <span>13,000</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
