# Client-Only SPA Template

This repository is a static React Router v7 SPA template with a generic application shell.

It includes a reusable header/sidebar/content layout, local-first client state, shared UI primitives, and SPA route structure.

> **⚠️ Important**: This is a **template repository** showcasing patterns and structure, not a feature-complete product.

> **Required reading**: Review [AGENTS.md](./AGENTS.md) before development for commands, coding standards, and architecture rules.

## Included

- React Router SPA routing under `app/routes.ts`
- Generic shell layout with header, navigation sidebar, main content, and footer
- Local storage-backed client state helpers
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
- The shared shell theme is persisted independently with a small local storage key.
- Frontend runtime errors are logged to the browser console by default. If you want remote logging later, wire an endpoint into `app/utils/error-logger.ts`.
- The index route currently mounts a reference-only demo component that should be deleted before real task implementation.

## Notes

- The build output is intended for static hosting.
- Review `app/components/Demo.tsx`, then remove it and its index-route mount before implementing the actual product request.
