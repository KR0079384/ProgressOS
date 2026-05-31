import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { focusHours } from "@/lib/data";

export function FocusHoursChart() {
  return (
    <div className="h-56 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={focusHours} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="focusGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0.5} />
              <stop offset="100%" stopColor="oklch(0.78 0.15 200)" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="deepGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.15 280)" stopOpacity={0.4} />
              <stop offset="100%" stopColor="oklch(0.72 0.15 280)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false} />
          <XAxis
            dataKey="day"
            stroke="oklch(1 0 0 / 0.3)"
            fontSize={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis stroke="oklch(1 0 0 / 0.3)" fontSize={10} tickLine={false} axisLine={false} />
          <Tooltip
            contentStyle={{
              background: "oklch(0.16 0.02 260 / 0.9)",
              border: "1px solid oklch(1 0 0 / 0.08)",
              borderRadius: 12,
              fontSize: 12,
              backdropFilter: "blur(12px)",
            }}
            labelStyle={{
              color: "oklch(0.78 0.15 200)",
              fontFamily: "JetBrains Mono",
              fontSize: 10,
            }}
          />
          <Area
            type="monotone"
            dataKey="hours"
            stroke="oklch(0.78 0.15 200)"
            strokeWidth={2}
            fill="url(#focusGrad)"
          />
          <Area
            type="monotone"
            dataKey="deep"
            stroke="oklch(0.72 0.15 280)"
            strokeWidth={2}
            fill="url(#deepGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
