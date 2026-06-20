import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";

const moods = [
  { value: 1, emoji: "😞", label: "Bad" },
  { value: 2, emoji: "😐", label: "Okay" },
  { value: 3, emoji: "🙂", label: "Good" },
  { value: 4, emoji: "😄", label: "Great" },
  { value: 5, emoji: "🚀", label: "Excellent" },
];

export default function ReflectionForm() {
  const [mood, setMood] = useState<number>(3);
  const [energy, setEnergy] = useState<number[]>([3]);
  const [wins, setWins] = useState("");
  const [blockers, setBlockers] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = async () => {
    console.log({
      mood,
      energy: energy[0],
      wins,
      blockers,
      notes,
    });

    // TODO:
    // Insert into Supabase here
  };

  return (
    <Card className="border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Daily Reflection</CardTitle>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Mood */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">How was today?</h3>

          <div className="flex gap-3">
            {moods.map((item) => (
              <button
                key={item.value}
                onClick={() => setMood(item.value)}
                className={`flex flex-col items-center rounded-xl px-4 py-3 transition-all ${
                  mood === item.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted hover:bg-muted/70"
                }`}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-xs">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Energy */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Energy Level</h3>

          <Slider min={1} max={5} step={1} value={energy} onValueChange={setEnergy} />

          <div className="mt-2 text-sm text-muted-foreground">Energy: {energy[0]} / 5</div>
        </div>

        {/* Wins */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Biggest Win</h3>

          <Textarea
            value={wins}
            onChange={(e) => setWins(e.target.value)}
            placeholder="What went well today?"
            rows={4}
          />
        </div>

        {/* Blockers */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Biggest Blocker</h3>

          <Textarea
            value={blockers}
            onChange={(e) => setBlockers(e.target.value)}
            placeholder="What slowed you down?"
            rows={4}
          />
        </div>

        {/* Notes */}
        <div>
          <h3 className="mb-3 text-sm font-medium text-muted-foreground">Additional Notes</h3>

          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else worth remembering?"
            rows={4}
          />
        </div>

        <Button className="w-full" onClick={handleSubmit}>
          Save Reflection
        </Button>
      </CardContent>
    </Card>
  );
}
