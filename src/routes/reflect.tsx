import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import ReflectionForm from "@/components/reflection/ReflectionForm";
import ReflectionInsight from "@/components/reflection/ReflectionInsight";

export const Route = createFileRoute("/reflect")({
  head: () => ({
    meta: [
      { title: "Reflect · Momentum OS" },
      {
        name: "description",
        content: "Reflect on your day, track your mood and energy, and build momentum.",
      },
    ],
  }),
  component: ReflectionPage,
});

function ReflectionPage() {
  return (
    <div className="space-y-8">
      {/* Eyebrow */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <div className="text-hud text-[10px] text-momentum mb-2">DAILY REFLECTION</div>
          <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
            Log Your Progress.
          </h1>
          <p className="mt-1 text-sm text-foreground/60 max-w-[60ch]">
            Take a moment to reflect on your daily missions, mood, and energy levels.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-12 lg:col-span-7"
        >
          <ReflectionForm />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="col-span-12 lg:col-span-5"
        >
          <ReflectionInsight />
        </motion.section>
      </div>
    </div>
  );
}
