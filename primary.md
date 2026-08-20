# ProgressOS Repository Map

ProgressOS is a personal productivity, reflection, and habit-tracking operating system built with TanStack Start, React, and Supabase.
It features interactive dashboards, daily reflections, focus analytics, mission tracking, and custom UI components.

## Repository Structure

```text
ProgressOS/
├── scripts/
│   └── validate_wiki.py
├── src/
│   ├── components/
│   │   ├── dashboard/
│   │   ├── layout/
│   │   ├── reflection/
│   │   └── ui/
│   ├── hooks/
│   ├── lib/
│   │   └── api/
│   ├── routes/
│   ├── routeTree.gen.ts
│   ├── router.tsx
│   ├── server.ts
│   ├── start.ts
│   └── styles.css
└── primary.md
```

## Navigation

| Area | Purpose | Start Here |
|---|---|---|
| `src/` | Main application source code including routes, components, and hooks | `src/src.md` |
| `scripts/` | Project maintenance, repository navigation, and validation scripts | `scripts/scripts.md` |

## Files

| File | Description |
|---|---|
| `.env.local` | Environment variable configurations for local API and Supabase keys. |
| `.gitignore` | Git ignore specification for build outputs and dependencies. |
| `.prettierignore` | Prettier formatter exclusion configuration. |
| `.prettierrc` | Code formatting options for Prettier. |
| `bun.lock` | Bun lockfile for reproducible dependency installations. |
| `bunfig.toml` | Bun runtime configuration settings. |
| `components.json` | shadcn/ui framework configuration for UI primitives. |
| `eslint.config.js` | ESLint configuration for code quality and linting. |
| `package-lock.json` | npm lockfile ensuring consistent package dependency trees. |
| `package.json` | Project manifest declaring scripts, metadata, and dependencies. |
| `primary.md` | Master repository navigation index and entry point for LLM agents. |
| `repo_feature_context.md` | Comprehensive overview of ProgressOS feature architecture and goals. |
| `tsconfig.json` | TypeScript compiler configuration and path resolution rules. |
| `vite.config.ts` | Vite bundler build settings and plugin registrations. |

## Subdirectories

| Directory | Description | Wiki |
|---|---|---|
| `scripts/` | Utility scripts for repository validation and development. | `scripts/scripts.md` |
| `src/` | React frontend application, TanStack Start routes, and backend integration. | `src/src.md` |

## Agent Navigation Rule

When working on this repository:

1. Read `primary.md` first.
2. Identify the relevant top-level directory.
3. Read that directory's `<dirname>.md` (e.g. `src/src.md`).
4. Follow the wiki recursively into relevant subdirectories.
5. Use the file descriptions to identify the source files relevant to the task.
6. Read the actual source files before making assumptions.
7. Do not scan unrelated directories unless the task requires them.
8. Treat source code as the implementation truth.
9. Treat these wiki files as navigation/context aids, not as substitutes for source code.
