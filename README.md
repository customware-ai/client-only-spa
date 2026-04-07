# Client-Only SPA Template

This repository is a static React Router v7 SPA template for CPQ-style workflow products.

It includes a workflow shell, local-first workspace state, shared UI primitives, and SPA route structure.

> **⚠️ Important**: This is a **template repository** showcasing patterns and structure, not a feature-complete product.

> **Required reading**: Review [AGENTS.md](./AGENTS.md) before development for commands, coding standards, and architecture rules.

## Included

- React Router SPA routing under `app/routes.ts`
- CPQ workflow shell and local storage workspace state
- Empty workflow-shell default state for new implementations
- Root-level `Demo` reference component for shipped shadcn coverage
- Shared UI components in `app/components/ui`
- Tailwind + Vite build setup
- TypeScript native preview (`tsgo`), oxlint, route type generation, and `neverthrow`

## Scripts

```bash
npm install
npm run dev
npm run build
npm run preview
npm run start
npm run check
```

`npm run check` uses `tsgo` from `@typescript/native-preview` for type-checking.

## Project Structure

```text
app/
├── components/
│   ├── Demo.tsx
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
- Shared storage helpers use `neverthrow` for parse/serialize/storage failure handling.
- Use `app/hooks/use-local-storage.ts` for browser-persisted client state instead of reaching into `window.localStorage` directly.
- Workflow progression is derived from the shared workflow engine in `app/lib/workflow-engine.ts`.
- The starter workflow definition is intentionally empty, so the shell can be shaped around the actual product flow later.
- Frontend runtime errors are logged to the browser console by default. If you want remote logging later, wire an endpoint into `app/utils/error-logger.ts`.
- The index route currently mounts a reference-only demo component that should be deleted before real task implementation.

## Notes

- The build output is intended for static hosting.
- Review `app/components/Demo.tsx`, then remove it and its index-route mount before implementing the actual product request.
