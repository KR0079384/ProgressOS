import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReflectionInsights } from "@/hooks/useReflections";

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatTile({
  label,
  value,
  unit,
  accent,
}: {
  label: string;
  value: string;
  unit?: string;
  accent?: "momentum" | "ember" | "flow";
}) {
  const accentClass = accent
    ? { momentum: "text-momentum", ember: "text-ember", flow: "text-flow" }[accent]
    : "text-foreground";

  return (
    <div className="rounded-xl bg-muted/30 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className={`mt-2 text-3xl font-bold font-display ${accentClass}`}>
        {value}
        {unit && <span className="text-base font-normal text-muted-foreground ml-1">{unit}</span>}
      </p>
    </div>
  );
}

function TextTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-muted/30 p-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 font-medium leading-snug line-clamp-3">{value}</p>
    </div>
  );
}

function SkeletonTile() {
  return <div className="rounded-xl bg-white/5 h-20 animate-pulse" />;
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-10 text-center gap-3">
      <div className="size-12 rounded-2xl bg-momentum/10 grid place-items-center text-momentum">
        <TrendingUp className="size-5" />
      </div>
      <p className="text-sm font-medium">No reflections yet</p>
      <p className="text-xs text-muted-foreground max-w-[24ch]">
        Complete your first daily reflection to unlock insights.
      </p>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

interface ReflectionInsightProps {
  days?: number;
}

export default function ReflectionInsight({ days = 7 }: ReflectionInsightProps) {
  const { insights, isLoading, isError } = useReflectionInsights(days);

  const hasData = insights.totalEntries > 0;

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{days}-Day Reflection Insights</CardTitle>

        {hasData && (
          <span className="text-hud text-[10px] text-foreground/40">
            {insights.totalEntries} ENTR{insights.totalEntries === 1 ? "Y" : "IES"}
          </span>
        )}
      </CardHeader>

      <CardContent className="space-y-5">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <SkeletonTile />
              <SkeletonTile />
            </div>
            <SkeletonTile />
            <SkeletonTile />
          </div>
        ) : isError ? (
          <p className="text-sm text-destructive text-center py-6" role="alert">
            Could not load insights. Please refresh.
          </p>
        ) : !hasData ? (
          <EmptyState />
        ) : (
          <>
            {/* Numeric averages */}
            <div className="grid grid-cols-2 gap-3">
              <StatTile
                label="Avg Mood"
                value={insights.averageMood!.toFixed(1)}
                unit="/ 5"
                accent="momentum"
              />
              <StatTile
                label="Avg Energy"
                value={insights.averageEnergy!.toFixed(1)}
                unit="/ 5"
                accent="flow"
              />
            </div>

            {/* Top phrases */}
            {insights.topWin && <TextTile label="Most Frequent Win" value={insights.topWin} />}
            {insights.topBlocker && (
              <TextTile label="Most Common Blocker" value={insights.topBlocker} />
            )}

            {/* Subtle mood trend indicator */}
            {insights.averageMood !== null && (
              <div className="text-xs text-muted-foreground text-center pt-1">
                Based on the last {insights.totalEntries} reflection
                {insights.totalEntries !== 1 ? "s" : ""}
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
