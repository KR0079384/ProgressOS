import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { AppShell } from "@/components/layout/AppShell";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center momentum-bg px-4">
      <div className="max-w-md text-center glass-panel rounded-3xl p-10">
        <div className="text-hud text-xs text-momentum mb-3">ERROR · 404</div>
        <h1 className="font-display text-6xl font-black tracking-tighter">Off-grid.</h1>
        <p className="mt-3 text-sm text-foreground/60">
          The signal you followed leads nowhere. Return to base.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-momentum px-5 py-2.5 text-sm font-bold text-background"
          style={{ boxShadow: "var(--shadow-glow-accent)" }}
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center momentum-bg px-4">
      <div className="max-w-md text-center glass-panel rounded-3xl p-10">
        <div className="text-hud text-xs text-survival mb-3">SYSTEM FAULT</div>
        <h1 className="font-display text-2xl font-bold">This page didn't load.</h1>
        <p className="mt-2 text-sm text-foreground/60">
          Something destabilized. Re-sync or return to base.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-xl bg-momentum px-4 py-2 text-sm font-bold text-background"
          >
            Re-sync
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-glass-border bg-white/5 px-4 py-2 text-sm font-medium"
          >
            Dashboard
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Momentum OS — Operate at peak consistency" },
      { name: "description", content: "Momentum OS is a psychologically engineered productivity operating system. Build streaks, prove your work, and stay in flow." },
      { name: "author", content: "Momentum OS" },
      { property: "og:title", content: "Momentum OS" },
      { property: "og:description", content: "A productivity OS designed for consistency, proof-of-work and anti-burnout." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Inter+Tight:wght@700;800;900&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <AppShell>
        <Outlet />
      </AppShell>
    </QueryClientProvider>
  );
}
