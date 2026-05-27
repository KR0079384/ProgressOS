export type Priority = "P1" | "P2" | "P3";
export type MissionStatus = "active" | "todo" | "done";

export interface Mission {
  id: string;
  title: string;
  project: string;
  priority: Priority;
  duration: string;
  status: MissionStatus;
  survival?: boolean;
  xp: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  done: number;
  total: number;
  tone: "momentum" | "flow" | "ember" | "neutral";
  milestones: { label: string; done: boolean }[];
}

export interface Achievement {
  id: string;
  code: string;
  name: string;
  earned: boolean;
  tone: "momentum" | "ember" | "flow" | "neutral";
}

export interface ActivityItem {
  id: string;
  time: string;
  text: string;
  tag: "ship" | "focus" | "streak" | "level";
}

export const missions: Mission[] = [
  { id: "m1", title: "Refactor Momentum Core API", project: "Momentum OS", priority: "P1", duration: "2h block", status: "active", survival: true, xp: 120 },
  { id: "m2", title: "Review Design System Tokens", project: "Helios", priority: "P2", duration: "45m", status: "todo", xp: 40 },
  { id: "m3", title: "Write launch announcement draft", project: "Helios", priority: "P2", duration: "30m", status: "todo", xp: 30 },
  { id: "m4", title: "Pair-review onboarding flow", project: "Neural Engine", priority: "P3", duration: "20m", status: "todo", xp: 20 },
  { id: "m5", title: "Draft Survival Mode logic", project: "Momentum OS", priority: "P1", duration: "1h", status: "done", xp: 80 },
  { id: "m6", title: "Ship telemetry pipeline v2", project: "Neural Engine", priority: "P1", duration: "3h", status: "done", xp: 150 },
];

export const projects: Project[] = [
  {
    id: "p1",
    name: "Project Helios",
    description: "Product launch & brand system",
    done: 12, total: 24, tone: "momentum",
    milestones: [
      { label: "Brand identity locked", done: true },
      { label: "Landing page v1 shipped", done: true },
      { label: "Press kit ready", done: false },
      { label: "Public launch", done: false },
    ],
  },
  {
    id: "p2",
    name: "Neural Engine",
    description: "ML inference layer refinement",
    done: 8, total: 32, tone: "flow",
    milestones: [
      { label: "Model v3 trained", done: true },
      { label: "Inference < 80ms", done: false },
      { label: "Beta release", done: false },
    ],
  },
  {
    id: "p3",
    name: "Atlas Docs",
    description: "Developer documentation rewrite",
    done: 18, total: 22, tone: "ember",
    milestones: [
      { label: "IA finalized", done: true },
      { label: "Examples rewritten", done: true },
      { label: "Search shipped", done: true },
      { label: "Publish", done: false },
    ],
  },
  {
    id: "p4",
    name: "Obsidian Sync",
    description: "Cross-device state replication",
    done: 3, total: 18, tone: "neutral",
    milestones: [
      { label: "RFC approved", done: true },
      { label: "Prototype merge", done: false },
    ],
  },
];

export const achievements: Achievement[] = [
  { id: "a1", code: "7D", name: "Seven Day Streak", earned: true, tone: "momentum" },
  { id: "a2", code: "30D", name: "Thirty Day Streak", earned: true, tone: "ember" },
  { id: "a3", code: "FLW", name: "Flow Master — 4h", earned: true, tone: "flow" },
  { id: "a4", code: "SHP", name: "Shipper — 50 missions", earned: true, tone: "momentum" },
  { id: "a5", code: "100", name: "Centurion — 100 day streak", earned: false, tone: "neutral" },
  { id: "a6", code: "DW", name: "Deep Worker — 8h block", earned: false, tone: "neutral" },
  { id: "a7", code: "SUR", name: "Survivor — burnout averted", earned: false, tone: "neutral" },
];

export const activity: ActivityItem[] = [
  { id: "v1", time: "09:12", text: "Completed mission · Review daily analytics", tag: "ship" },
  { id: "v2", time: "08:30", text: "Entered deep work block · 90 min", tag: "focus" },
  { id: "v3", time: "07:55", text: "Streak extended to 14 days", tag: "streak" },
  { id: "v4", time: "Yesterday", text: "Reached level 14 · Tactical Operative", tag: "level" },
  { id: "v5", time: "Yesterday", text: "Shipped telemetry pipeline v2", tag: "ship" },
];

// 12 weeks × 7 days heatmap, values 0..4
export const heatmap: number[][] = Array.from({ length: 12 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => {
    const seed = (w * 7 + d) * 13;
    const r = ((seed * 9301 + 49297) % 233280) / 233280;
    if (d === 5 || d === 6) return r > 0.7 ? 1 : 0;
    return Math.min(4, Math.floor(r * 5));
  }),
);

export const focusHours = [
  { day: "Mon", hours: 4.2, deep: 3.1 },
  { day: "Tue", hours: 5.6, deep: 4.4 },
  { day: "Wed", hours: 3.1, deep: 2.0 },
  { day: "Thu", hours: 6.4, deep: 5.2 },
  { day: "Fri", hours: 5.9, deep: 4.6 },
  { day: "Sat", hours: 1.2, deep: 0.5 },
  { day: "Sun", hours: 0.6, deep: 0 },
];

export const momentumTrend = Array.from({ length: 30 }, (_, i) => ({
  day: i + 1,
  score: Math.round(55 + 25 * Math.sin(i / 4) + (i / 30) * 15 + (i % 5 === 0 ? -8 : 0)),
  burnout: Math.round(20 + 10 * Math.cos(i / 3) + (i > 22 ? (i - 22) * 2 : 0)),
}));

export const navItems = [
  { code: "01", label: "Dashboard", to: "/" },
  { code: "02", label: "Missions", to: "/missions" },
  { code: "03", label: "Projects", to: "/projects" },
  { code: "04", label: "Focus Hub", to: "/focus" },
  { code: "05", label: "Analytics", to: "/analytics" },
  { code: "06", label: "Achievements", to: "/achievements" },
  { code: "07", label: "Settings", to: "/settings" },
] as const;
