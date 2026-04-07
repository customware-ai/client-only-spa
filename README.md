# Client-Only SPA Template

This repository is a static React Router v7 SPA template for CPQ-style workflow products.

It keeps the workflow shell, local-first workspace state, shared UI primitives, and route structure. It does not include a backend, database layer, test harness, or server runtime.

## What Stays

- React Router SPA routing under `app/routes.ts`
- CPQ workflow shell and local storage workspace state
- Shared UI components in `app/components/ui`
- A root-mounted demo component for shipped shadcn component reference
- Tailwind + Vite build setup
- TypeScript, oxlint, and route type generation

## What Was Removed

- `server/` backend code
- `tests/` and test runner config
- Drizzle, SQLite, tRPC, Hono, and related packages
- Backend-only env, migration, and server startup config

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run check
```

## Project Structure

```text
app/
├── components/
│   ├── cpq/
│   └── ui/
├── hooks/
├── layouts/
├── lib/
├── routes/
├── utils/
├── app.css
├── root.tsx
└── routes.ts
```

## Runtime Model

- The app is fully client-side.
- Workspace data is stored in browser local storage.
- Workflow progression is derived from the shared workflow engine in `app/lib/workflow-engine.ts`.
- Frontend runtime errors are logged to the browser console by default. If you want remote logging later, wire an endpoint into `app/utils/error-logger.ts`.
- The index route currently mounts a reference-only demo component that should be deleted before real task implementation.

## Notes

- The build output is intended for static hosting.
- If you reintroduce a backend later, add it explicitly rather than restoring the old template scaffold.
