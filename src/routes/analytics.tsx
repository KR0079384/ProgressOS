import { createFileRoute } from "@tanstack/react-router";
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts";
import { PageHeader } from "@/components/ui/PageHeader";
import { focusHours, momentumTrend } from "@/lib/data";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · Momentum OS" },
      { name: "description", content: "Momentum trends, consistency graphs and burnout prediction." },
    ],
  }),
  component: AnalyticsPage,
});

const tooltipStyle = {
  background: "oklch(0.16 0.02 260 / 0.92)",
  border: "1px solid oklch(1 0 0 / 0.08)",
  borderRadius: 12,
  fontSize: 12,
  backdropFilter: "blur(12px)",
};

function AnalyticsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="SIGNAL"
        title="Analytics"
        description="Patterns over time. The numbers behind the streak."
      />

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <section className="col-span-12 glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-hud text-[10px] text-foreground/40">30-DAY TREND</div>
              <h3 className="font-display text-xl font-bold">Momentum Score</h3>
            </div>
            <div className="text-right">
              <div className="text-hud text-[10px] text-foreground/40">CURRENT</div>
              <div className="font-display text-xl font-bold text-momentum">82</div>
            </div>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={momentumTrend} margin={{ top: 8, right: 16, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="momGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} labelStyle={{ color: "oklch(0.78 0.15 200)", fontFamily: "JetBrains Mono", fontSize: 10 }} />
                <Area type="monotone" dataKey="score" stroke="oklch(0.78 0.15 200)" strokeWidth={2.5} fill="url(#momGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="col-span-12 md:col-span-6 glass-panel rounded-3xl p-6">
          <div className="text-hud text-[10px] text-foreground/40">WEEKLY</div>
          <h3 className="font-display text-xl font-bold mb-4">Focus Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={focusHours} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "oklch(1 0 0 / 0.03)" }} />
                <Bar dataKey="hours" fill="oklch(0.78 0.15 200)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="deep" fill="oklch(0.72 0.15 280)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        <section className="col-span-12 md:col-span-6 glass-panel rounded-3xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-hud text-[10px] text-survival">BURNOUT MODEL</div>
              <h3 className="font-display text-xl font-bold">Risk Prediction</h3>
            </div>
            <div className="text-right">
              <div className="text-hud text-[10px] text-foreground/40">RISK</div>
              <div className="font-display text-xl font-bold text-survival">Moderate</div>
            </div>
          </div>
          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={momentumTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Line type="monotone" dataKey="burnout" stroke="oklch(0.65 0.22 20)" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-foreground/50 mt-3">
            Predicted spike day 27–30. Schedule a recovery block.
          </p>
        </section>
      </div>
    </div>
  );
}
