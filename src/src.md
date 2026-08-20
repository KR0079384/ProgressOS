# Src

The `src` directory contains the core source code for ProgressOS, including application components, custom hooks, utility libraries, TanStack Start routes, and server handlers.

## Files

| File | Description |
|---|---|
| `routeTree.gen.ts` | Auto-generated routing tree manifest created by TanStack Router. |
| `router.tsx` | Router initialization file configuring TanStack Router with React Query context and scroll restoration. |
| `server.ts` | Server entry point for SSR requests, error page rendering, and h3 server framework adapter. |
| `start.ts` | TanStack Start application instance definition with global error handling middleware. |
| `styles.css` | Main CSS file containing Tailwind CSS directives and global theme styles. |

## Subdirectories

| Directory | Description | Wiki |
|---|---|---|
| `components/` | Reusable React UI components including dashboard widgets, layout shells, and primitives. | [components/components.md](components/components.md) |
| `hooks/` | Custom React hooks for authentication, responsive layout, and data fetching. | [hooks/hooks.md](hooks/hooks.md) |
| `lib/` | Core business logic, Supabase client initialization, mock data, and TypeScript types. | [lib/lib.md](lib/lib.md) |
| `routes/` | File-based routing pages built with TanStack Router for application views. | [routes/routes.md](routes/routes.md) |
