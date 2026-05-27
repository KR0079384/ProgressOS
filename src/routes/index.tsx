import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MomentumRing } from "@/components/dashboard/MomentumRing";
import { ConsistencyHeatmap } from "@/components/dashboard/ConsistencyHeatmap";
import { MissionList } from "@/components/dashboard/MissionList";
import { ProjectsGrid } from "@/components/dashboard/ProjectsGrid";
import { AchievementsRow } from "@/components/dashboard/AchievementsRow";
import { FocusHoursChart } from "@/components/dashboard/FocusHoursChart";
import { SurvivalIndicator } from "@/components/dashboard/SurvivalIndicator";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { achievements, missions, projects } from "@/lib/data";
import { ArrowUpRight, Clock, TrendingUp, Zap } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · Momentum OS" },
      { name: "description", content: "Your momentum score, consistency, and today's missions at a glance." },
    ],
  }),
  component: Dashboard,
});

function StatChip({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  tone: "momentum" | "flow" | "ember";
}) {
  const colorMap = {
    momentum: "text-momentum",
    flow: "text-flow",
    ember: "text-ember",
  } as const;
  return (
    <div className="glass-panel rounded-2xl p-4 flex items-center gap-3">
      <div className={`size-9 rounded-xl bg-white/5 border border-glass-border grid place-items-center ${colorMap[tone]}`}>
        <Icon className="size-4" />
      </div>
      <div>
        <div className="text-hud text-[10px] text-foreground/40">{label}</div>
        <div className="font-display text-lg font-bold">{value}</div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Eyebrow */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-hud text-[10px] text-momentum mb-2">
            TUE · OCT 28 · DAY 142 OF CONSISTENCY
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Good morning, Alex.
          </h1>
          <p className="mt-1 text-sm text-foreground/60 max-w-[60ch]">
            Your momentum is rising. Hold the line — one focused block locks in your streak.
          </p>
        </div>
        <SurvivalIndicator active />
      </div>

      {/* Hero row */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 lg:col-span-4 glass-panel rounded-3xl p-8 relative overflow-hidden flex flex-col items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-momentum/60 to-transparent" />
          <MomentumRing score={82} />
          <div className="mt-6 text-center">
            <h3 className="font-display text-lg font-bold">High Momentum</h3>
            <p className="text-xs text-foreground/50 mt-1 max-w-[24ch]">
              Operating at 1.4× your baseline efficiency.
            </p>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-12 lg:col-span-8 glass-panel rounded-3xl p-6 md:p-8"
        >
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="text-hud text-[10px] text-foreground/40">CONSISTENCY PROFILE</div>
              <h3 className="font-display text-xl font-bold mt-1">Proof of Work · 12 weeks</h3>
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-hud text-[10px] text-foreground/40">CURRENT STREAK</div>
              <div className="font-display text-xl font-bold text-ember">14 days</div>
            </div>
          </div>
          <ConsistencyHeatmap />
        </motion.section>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatChip icon={Clock} label="Deep Work · Today" value="4.2h" tone="momentum" />
        <StatChip icon={Zap} label="Missions Shipped" value="6 / 8" tone="ember" />
        <StatChip icon={TrendingUp} label="Weekly Trend" value="+18%" tone="flow" />
        <StatChip icon={ArrowUpRight} label="Next Level" value="65%" tone="momentum" />
      </div>

      {/* Missions + Focus */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <section className="col-span-12 lg:col-span-7">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-hud text-[10px] text-foreground/40">TODAY</div>
              <h3 className="font-display text-xl font-bold">Daily Missions</h3>
            </div>
            <button className="text-hud text-[10px] text-momentum hover:underline">VIEW ALL</button>
          </div>
          <MissionList initial={missions} />
        </section>

        <section className="col-span-12 lg:col-span-5 glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-hud text-[10px] text-foreground/40">FOCUS HOURS</div>
              <h3 className="font-display text-xl font-bold">This week</h3>
            </div>
            <div className="flex items-center gap-3 text-[10px] font-mono">
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-momentum" />Focus</span>
              <span className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-flow" />Deep</span>
            </div>
          </div>
          <FocusHoursChart />
          <div className="mt-4 pt-4 border-t border-glass-border flex items-center justify-between">
            <span className="text-hud text-[10px] text-foreground/40">PEAK</span>
            <span className="text-sm font-semibold">6.4h / Thu</span>
          </div>
        </section>
      </div>

      {/* Projects */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-hud text-[10px] text-foreground/40">IN-FLIGHT</div>
            <h3 className="font-display text-xl font-bold">Active Projects</h3>
          </div>
          <button className="text-hud text-[10px] text-momentum hover:underline">NEW PROJECT</button>
        </div>
        <ProjectsGrid projects={projects.slice(0, 4)} compact />
      </section>

      {/* Activity + Achievements */}
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <section className="col-span-12 lg:col-span-5 glass-panel rounded-3xl p-6">
          <div className="text-hud text-[10px] text-foreground/40 mb-1">RECENT</div>
          <h3 className="font-display text-xl font-bold mb-4">Activity</h3>
          <ActivityFeed />
        </section>
        <section className="col-span-12 lg:col-span-7">
          <div className="text-hud text-[10px] text-foreground/40 mb-1">RANK PROGRESSION</div>
          <h3 className="font-display text-xl font-bold mb-4">Achievements</h3>
          <AchievementsRow items={achievements} />
        </section>
      </div>
    </div>
  );
}
