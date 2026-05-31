import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui/PageHeader";
import { ProjectsGrid } from "@/components/dashboard/ProjectsGrid";
import { projects } from "@/lib/data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects · Momentum OS" },
      { name: "description", content: "Track every in-flight project, milestone and subtask." },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <div>
      <PageHeader
        eyebrow="IN-FLIGHT"
        title="Projects"
        description="Every milestone is a checkpoint. Every checkpoint is proof you can stack more."
        action={
          <button
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-momentum text-background font-bold text-sm"
            style={{ boxShadow: "var(--shadow-glow-accent)" }}
          >
            <Plus className="size-4" strokeWidth={2.5} /> New Project
          </button>
        }
      />
      <ProjectsGrid projects={projects} />
    </div>
  );
}
