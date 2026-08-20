# Lib

The `lib` directory contains application helper functions, backend integration clients, mock datasets, type definitions, and error handling utilities.

## Files

| File | Description |
|---|---|
| `auth.ts` | Supabase authentication helper functions for user signup, signin, and session management. |
| `config.server.ts` | Server-side environment configuration loader and secret validation utility. |
| `data.ts` | Fallback mock datasets for missions, focus hours, projects, achievements, and activity feeds. |
| `error-capture.ts` | Global runtime error interceptor and uncaught exception handler. |
| `error-page.ts` | Fallback HTML page generator for rendering catastrophic SSR rendering errors. |
| `reflections.ts` | Supabase data access layer for creating, reading, and updating reflection records. |
| `supabase.ts` | Initializes and exports the browser Supabase client instance using environment variables. |
| `testConnection.ts` | Utility script function to verify database connectivity with Supabase services. |
| `types.ts` | Core TypeScript interfaces and type definitions for ProgressOS domain models. |
| `utils.ts` | Utility helper functions including `cn` class name merger for Tailwind CSS styling. |

## Subdirectories

| Directory | Description | Wiki |
|---|---|---|
| `api/` | Server function handlers and API route implementations for TanStack Start. | [api/api.md](api/api.md) |
