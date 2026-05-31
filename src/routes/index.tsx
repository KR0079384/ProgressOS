import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: GettingStarted,
});

function GettingStarted() {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate({ to: "/dashboard" });
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="size-8 rounded-full border-2 border-momentum border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-4xl text-center">
        <div className="text-hud text-momentum mb-4">MOMENTUM OS</div>

        <h1 className="font-display text-5xl md:text-7xl font-black">Build Momentum.</h1>

        <h1 className="font-display text-5xl md:text-7xl font-black text-momentum">Every Day.</h1>

        <p className="mt-8 text-lg text-foreground/70 max-w-2xl mx-auto">
          A productivity operating system designed around consistency, proof-of-work, focus, and
          sustainable progress.
        </p>

        <div className="mt-10 flex justify-center gap-4">
          <Link
            to="/login"
            className="rounded-2xl bg-momentum px-8 py-4 font-semibold text-background"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
