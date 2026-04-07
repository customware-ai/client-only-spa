# AGENTS.md

This repository is a client-only React Router SPA template. Keep responses terse.

## Read First

- Read `README.md` before making decisions.
- Re-read this file after compaction.

## Scope

- `app/` is the product.
- There is no backend, database layer, or server runtime in this repo.
- Workspace state is local-first and lives in browser storage.

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run typecheck
npm run lint
npm run check
```

## Rules

1. Keep the repo client-only. Do not add backend/server/database scaffolding unless the user explicitly asks for it.
2. Prefer strict TypeScript with explicit return types.
3. Keep route definitions in `app/routes.ts`.
4. Keep reusable UI in `app/components/` and route composition in `app/routes/`.
5. Keep workflow/domain logic in `app/lib/` or `app/utils/`, not inside route files.
6. Use local storage helpers and existing workspace contracts instead of introducing duplicate state shapes.
7. Update `README.md` when repo-level behavior or setup changes.

## Validation

- For code changes, run the narrowest relevant check.
- Run `npm run check` before finishing when the change affects executable code.
- No need to run checks for docs-only changes.

## Build Expectations

- `npm run build` must produce a static client build.
- `npm run preview` should preview the built SPA locally.
- Do not leave references to removed backend/test infrastructure in scripts, docs, or config.
