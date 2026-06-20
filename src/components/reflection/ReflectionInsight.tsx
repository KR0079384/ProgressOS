import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReflectionInsightProps {
  averageMood?: number;
  averageEnergy?: number;
  topBlocker?: string;
  topWin?: string;
}

export default function ReflectionInsight({
  averageMood = 4.2,
  averageEnergy = 3.8,
  topBlocker = "Context Switching",
  topWin = "Project Progress",
}: ReflectionInsightProps) {
  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle>7-Day Reflection Insights</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">Average Mood</p>

            <p className="mt-2 text-3xl font-bold">{averageMood.toFixed(1)}</p>
          </div>

          <div className="rounded-xl bg-muted/30 p-4">
            <p className="text-sm text-muted-foreground">Average Energy</p>

            <p className="mt-2 text-3xl font-bold">{averageEnergy.toFixed(1)}</p>
          </div>
        </div>

        <div className="rounded-xl bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">Most Common Blocker</p>

          <p className="mt-2 font-medium">{topBlocker}</p>
        </div>

        <div className="rounded-xl bg-muted/30 p-4">
          <p className="text-sm text-muted-foreground">Most Frequent Win</p>

          <p className="mt-2 font-medium">{topWin}</p>
        </div>
      </CardContent>
    </Card>
  );
}
