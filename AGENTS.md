# AGENTS.md

This file provides guidance to LLMs when working with code in this repository.

> **For project overview**: See [README.md](./README.md) for features and documentation.

---

## Quick Reference

Jump to section:

| Section | Description |
| --- | --- |
| [Core Principles](#core-principles) | Type safety, client architecture, error handling, UX |
| [Commands](#commands) | npm scripts for dev, build, preview, start, lint, and typecheck |
| [Architecture](#architecture) | Layered client architecture, data flow, storage boundaries |
| [Development Requirements](#development-requirements) | Non-negotiable rules, code style, patterns |
| [Directory Structure](#directory-structure) | File organization and structure principles |
| [Design System](#design-system) | Shared UI usage, visual consistency, layout expectations |
| [UX Requirements](#ux-requirements) | Loading, response states, error handling, responsive design |
| [Logging and Debugging](#logging-and-debugging) | Frontend runtime logging and recovery guidance |
| [React Component Patterns](#react-component-patterns) | Component structure, route patterns, state placement |
| [React Router v7 Guide](#react-router-v7-guide) | Client routing, `routes.ts` APIs, navigation patterns |
| [Autonomous Task Workflow](#autonomous-task-workflow) | Context management and execution rules |
| [Task Completion](#task-completion) | What to verify and report before finishing |

### Key Import Paths

```typescript
import { Button } from "~/components/ui/Button";
import { useLocalStorage } from "~/hooks/use-local-storage";
import { cn } from "~/lib/utils";
```

---

## Core Principles

This codebase follows strict architectural patterns and coding standards.

### 1. Type Safety First

- Every function must have explicit return types.
- No `any` types allowed. Use `unknown` or exact types.
- Use Zod schemas for runtime validation when input is untrusted.
- Full type checking must pass before code changes are considered complete.

### 2. Client-Only Architecture

- This template runs entirely in the browser.
- React Router v7 owns page structure, route hierarchy, and client navigation.
- Workspace state is local-first and persists in browser storage.
- Shared UI primitives live in `app/components/ui/`.
- Route composition lives in `app/routes/`.
- Domain and workflow logic live in `app/lib/` and `app/utils/`.

### 3. Error Handling

- Use explicit, recoverable error paths for client logic that can fail.
- Prefer predictable fallback states over throwing from shared helpers.
- Shared fallible helpers should use `neverthrow` where it improves safety and readability.
- Keep user-facing errors actionable and local to the surface that owns the failure.
- See [Error Handling UX](#error-handling-ux-mandatory) for user-facing patterns.

### 3.1 Contract Enforcement (Compile-Time + Runtime)

- Compile-time contracts: all function return types must be explicit and type-safe.
- Runtime contracts: all external or untrusted input must be validated before use.
- Contract reuse: derive TypeScript types from Zod schemas with `z.infer<>`; do not duplicate shapes manually.
- Boundary-first validation: validate at the route, hook, or helper boundary, then pass typed data deeper.
- No `any`: use exact types or `unknown` plus refinement.

### 4. Validation Requirements

- Run checks only at the very end of the task.
- Use the narrowest relevant check for scoped changes while iterating.
- For code changes, run `npm run check` before marking work complete.
- For route, shared UI, config, or build-affecting changes, also run `npm run build`.
- For runtime behavior changes, use `npm run start` for final local verification.
- No need to run checks for docs-only or non-code-only changes.

### 5. Code Quality Standards

- Write self-documenting code with clear names.
- Comment the "why", not the "what".
- Follow the single responsibility principle.
- Keep functions small and focused.

### 6. User Experience (UX) Standards

All user-facing code must implement proper UX patterns. Poor UX is a bug.

- Loading states: every async or deferred UI path must show loading feedback.
- State feedback: user-visible state changes should be clear when they matter.
- Error feedback: errors must be user-friendly, actionable, and recoverable.
- Responsive design: all UI must work on mobile, tablet, and desktop.
- Motion: use purposeful animation for feedback and guidance.

---

## Commands

```bash
npm install
npm run dev
npm run build
npm run preview
npm run start
npm run typecheck
npm run lint
npm run check
```

Notes:

- `npm run typecheck` uses `tsgo` from `@typescript/native-preview`.
- `npm run start` serves the existing `build/client` output through the repo-local Node static server in `start.js`.

---

## Architecture

This is a React Router v7 client-only SPA template with local-first workspace state.

### Architectural Flow

```text
User Interaction
    ↓
React Router Route Component (app/routes/*.tsx)
    ↓
Shared UI Primitives (app/components/ui/*)
    ↓
App-Level Components (app/components/*)
    ↓
Domain / Workflow Logic (app/lib/*, app/utils/*)
    ↓
Shared Storage Hooks (app/hooks/*)
    ↓
Browser Storage
```

### Key Rules

1. App routes and components compose UI from shared primitives and shared helpers.
2. Shared primitives belong in `app/components/ui/`.
3. App-specific reusable pieces belong in `app/components/`.
4. Workflow and domain behavior belong in `app/lib/` or `app/utils/`.
5. Browser-persisted state should flow through `app/hooks/use-local-storage.ts`.
6. Route files should stay focused on orchestration and page-specific interaction.

### Type Safety Flow

- Define runtime schemas where data is untrusted.
- Derive TypeScript types from schemas instead of duplicating shapes.
- Keep storage, workflow, and UI contracts aligned.

---

## Development Requirements

### Non-Negotiable Rules

1. Strict Type Safety
   - Every function must have explicit return types.
   - No `any` types. Use `unknown` or specific types.
   - Enforce compile-time contracts with TypeScript.
   - Enforce runtime contracts with Zod at trust boundaries.
   - Derive TypeScript types from schemas with `z.infer<>`.
   - Do not duplicate shape definitions across layers.

2. Validation Before Completion
   - Run checks only at the very end of the task.
   - Use focused validation based on the scope of changes.
   - Run `npm run check` before completion for code changes.
   - Run `npm run build` for route, shared UI, config, or build-output changes.
   - Fix all issues before moving on.

3. Single Source of Truth
   - Route definitions only in `app/routes.ts`
   - Shared shell only in `app/layouts/`
   - Shared primitives only in `app/components/ui/`
   - App-level reusable UI only in `app/components/`
   - Persistent client storage through `app/hooks/use-local-storage.ts`
   - Shared theme persistence through `app/lib/theme.ts`
   - Do not bypass these layers

4. Error Handling Pattern
   - Use explicit fallback states rather than silent failures.
   - Shared helpers should return predictable results for expected failure paths.
   - Do not patch around shared-state bugs in route code when the real fix belongs in the shared helper.

### Code Style Requirements

- Comments: write comments when they clarify intent or tradeoffs. Focus on the "why", not the "what".
- Naming: use clear, descriptive names for functions and variables.
- Functions: keep them small and focused.
- Imports: use the `~/` path alias for app imports.
- Formatting: let the project formatter handle formatting.

### Key Patterns

#### Local Storage with the Shared Hook

Persistent client state should go through `use-local-storage.ts`.

```typescript
const [workspace, setWorkspace] = useLocalStorage("workspace", defaultWorkspace);

const updateName = (name: string): void => {
  setWorkspace((current) => ({
    ...current,
    name,
  }));
};
```

Rules:

- Prefer the shared hook over raw `window.localStorage`.
- Reuse existing storage contracts before introducing new keys or shapes.
- Keep parse, serialize, and fallback behavior centralized in the shared hook.

#### Schema Validation with Zod

Always define schemas first, then derive types.

```typescript
import { z } from "zod";

export const WorkflowStepSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  description: z.string().min(1),
});

export type TemplateSection = z.infer<typeof WorkflowStepSchema>;
```

#### Error-Safe Shared Helpers

If shared helpers perform fallible parsing or storage work, keep failure handling explicit.

```typescript
import { Result } from "neverthrow";

function mapResult<T>(result: Result<T, Error>, fallback: T): T {
  return result.isOk() ? result.value : fallback;
}
```

---

## Directory Structure

```text
app/
├── components/
│   ├── Demo.tsx
│   └── ui/
├── hooks/
│   └── use-local-storage.ts
├── layouts/
│   └── MainLayout.tsx
├── lib/
│   ├── theme.ts
│   └── utils.ts
├── routes/
│   └── *.tsx
├── utils/
├── app.css
├── root.tsx
└── routes.ts
```

### Structure Principles

- `app/components/ui/` is the canonical shared component layer.
- `app/layouts/MainLayout.tsx` owns the shared shell.
- `app/routes/` owns page composition, not cross-page reusable internals.
- `app/lib/` and `app/utils/` own domain and workflow behavior.
- `app/hooks/use-local-storage.ts` is the shared persisted-state entrypoint.

---

## Design System

UI components are shadcn-based primitives adapted to this template.

### Visual System

- Use the shared token system defined in `app/app.css`.
- Keep layouts calm, readable, and product-oriented.
- Prefer consistent spacing and hierarchy over decorative structure.
- Preserve the existing shell and component conventions unless the task is explicitly about redesigning them.

### Shared UI Expectations

- Buttons, inputs, cards, overlays, navigation, and form primitives should come from `app/components/ui/`.
- Route-level styling should not fork shared component behavior without a clear product reason.
- If a shared component needs improvement, improve the shared component instead of patching around it in multiple routes.

### Layout Structure

- Shared shell and navigation belong in layouts.
- Route pages should compose sections, not rebuild the base shell.
- Dense screens should use spacing, grouping, and typography to stay readable.

---

## UX Requirements

Critical: this section defines mandatory UX patterns for all user-facing code. Poor UX is a bug.

---

### Loading States (MANDATORY)

Every async or deferred UI path must have a loading state. Users should never see blank or frozen screens.

Use the existing `Skeleton` component from `~/components/ui/Skeleton` where appropriate.

```typescript
return (
  <div className="space-y-3">
    <Skeleton className="h-10 w-full" />
    <Skeleton className="h-12 w-full" />
    <Skeleton className="h-12 w-full" />
  </div>
);
```

### Response UI (MANDATORY)

Interactive UI must visibly communicate its current state.

#### Core Principles

- Show idle, loading, success, and error states clearly.
- Keep feedback close to the control or section that triggered it.
- Do not hide important status changes behind console logs only.
- For local-first updates, reflect the actual local state immediately instead of adding artificial pending phases.

For this template, localStorage-backed updates are synchronous. Do not add fake pending or optimistic UI for basic persisted writes unless the interaction truly becomes asynchronous later.

#### Progressive Disclosure

Use collapsible or staged UI to reduce cognitive load. Show primary fields first and reveal advanced options on demand.

---

### Error Handling UX (MANDATORY)

Every error state must be user-friendly, actionable, and recoverable.

#### Core Principles

- Never show raw error messages directly to users.
- Always offer retry or recovery for recoverable problems.
- Gracefully degrade when fresh data or storage reads fail.
- Route error boundaries should handle unexpected route-level failures.

#### Error Message Pattern

```typescript
const ERROR_MESSAGES: Record<
  string,
  { title: string; description: string; action?: string }
> = {
  STORAGE_ERROR: {
    title: "Saved Data Could Not Load",
    description: "We could not read the saved workspace state.",
    action: "Retry",
  },
  NOT_FOUND: {
    title: "Not Found",
    description: "This item does not exist or was removed.",
    action: "Go Back",
  },
  UNKNOWN_ERROR: {
    title: "Something Went Wrong",
    description: "Please try again.",
    action: "Retry",
  },
};
```

#### Route Error Boundary Pattern

```typescript
import type { ReactElement } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary(): ReactElement {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <div>{error.status} {error.statusText}</div>;
  }

  const message = error instanceof Error ? error.message : "Unexpected error";
  return <div>{message}</div>;
}
```

#### Graceful Degradation Pattern

- If a storage read fails, prefer a safe fallback state over a broken screen.
- If previously cached client state exists, keep the UI usable while surfacing that the data may be stale.

---

### Responsive Design (MANDATORY)

All UI must be fully responsive. Mobile-first design is required.

#### Core Principles

- Mobile-first: write mobile styles first, then add breakpoint modifiers.
- Touch targets: minimum 44x44px where interaction density allows.
- Responsive tables: on narrow widths, prefer stacked or card-style alternatives rather than raw overflow.
- Avoid clipped actions, overlapping text, and unusable dense layouts.

Breakpoints: `sm:640px` `md:768px` `lg:1024px` `xl:1280px` `2xl:1536px`

Mobile-first pattern:

```typescript
<div className="flex flex-col gap-4 md:flex-row md:gap-6 lg:gap-8" />
```

Responsive navigation:

- Desktop sidebar: `hidden lg:flex`
- Mobile menu or sheet: `lg:hidden`

---

### Animation & Motion (MANDATORY)

Animation must be purposeful. It should provide feedback, guide attention, or create continuity.

#### Key Patterns

| Type | Tailwind Classes | Use Case |
| --- | --- | --- |
| Micro-interactions | `transition-colors duration-150` | Hover and active states |
| Scale feedback | `active:scale-[0.98]` | Button press |
| Page entrance | `animate-in fade-in slide-in-from-bottom-4` | Route transitions |
| Toast or notification | `animate-in slide-in-from-right-full fade-in` | Alerts |
| Shimmer skeleton | `animate-pulse` or project shimmer styles | Loading states |

Motion accessibility:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  ::before,
  ::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Logging and Debugging

- Frontend runtime errors are logged through `app/utils/error-logger.ts`.
- Prefer fixing the underlying state or rendering issue instead of suppressing console errors.
- When debugging state issues, check the shared storage hook and domain helpers before patching around symptoms in routes.
- Do not remove logging that is part of the shared runtime debugging path without replacing it with an equivalent mechanism.

---

## React Component Patterns

### Component Structure

```typescript
import type { ReactElement, ReactNode } from "react";

interface PanelProps {
  title: string;
  children: ReactNode;
}

export function Panel({ title, children }: PanelProps): ReactElement {
  return (
    <section className="rounded-xl border p-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
```

### Route Module Structure

Every route module should export:

1. `default` component to render route UI
2. Optional `ErrorBoundary` for route-level rendering or runtime failures
3. Optional metadata exports such as `meta` and `links`
4. Local loading and error UI where needed

Route files should assemble pages from shared components, hooks, and domain helpers.

### Shared Component Structure

- Shared component files should own one clear UI concern.
- Keep props typed explicitly.
- Keep variant behavior centralized instead of scattered across routes.

### State Placement

- Put persistent cross-route state in shared storage and workspace helpers.
- Put reusable view logic in hooks or `app/lib/`.
- Keep ephemeral page-only UI state local to the route or component that owns it.

### Linting Rules

`oxlint` enforces strict standards:

- explicit function return types
- no `any`
- proper JSX key usage

All violations must be fixed before finishing code changes.

### Path Alias

Use `~/` to import from `app/`.

---

## React Router v7 Guide

> **CRITICAL**: This section is the authoritative reference for client-side routing only. In this codebase, React Router is used for navigation, route hierarchy, and route module boundaries, not as a full-stack data framework.

### Overview

This app uses:

- React Router v7 for client-side URL matching and navigation
- Route config in `app/routes.ts` using `@react-router/dev/routes` helpers
- Route modules in `app/routes/*.tsx` and layouts in `app/layouts/*.tsx`
- Shared UI primitives, local storage hooks, and domain helpers inside route modules

What this means:

- React Router guidance here is about `routes.ts`, route modules, and navigation APIs
- Keep routing concerns in `app/routes.ts` plus route and layout modules
- Route modules should orchestrate UI, shared hooks, local storage-backed workspace state, and domain helpers

---

### `routes.ts` API (Authoritative)

`app/routes.ts` defines the route tree. Prefer helper functions from `@react-router/dev/routes`:

```typescript
import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/MainLayout.tsx", [
    index("routes/index.tsx"),
    route("customers/new", "routes/customers.new.tsx"),
  ]),
] satisfies RouteConfig;
```

Primary helpers:

1. `layout(file, children)` defines a layout route that renders an `Outlet`
2. `index(file)` defines the default child route at the parent's exact path
3. `route(path, file, children?)` defines a path route and optional nested children
4. `prefix(prefixPath, routes)` adds a shared URL prefix without a parent route file
5. `relative(directory)` builds a helper set scoped to another directory when splitting route config

`routes.ts` rules:

- Route module file paths are relative to `app/`
- Keep route config declarative; avoid runtime conditionals in route definitions
- Use `satisfies RouteConfig` on the default export
- Prefer `layout(...)` for shared shells instead of duplicating wrappers across route files

---

### Layout Route Contract

Layout modules, for example `app/layouts/MainLayout.tsx`, should provide shared UI and render children with `Outlet`.

```typescript
import type { ReactElement } from "react";
import { Outlet } from "react-router";

export default function MainLayout(): ReactElement {
  return (
    <main>
      {/* shared nav, header, shell */}
      <Outlet />
    </main>
  );
}
```

---

### Route Module Exports

Every route module should export:

1. `default` route component with an explicit `ReactElement` return type
2. Optional `ErrorBoundary` for unexpected route rendering or runtime failures
3. Optional metadata exports such as `meta` and `links` when needed

Route modules should keep routing concerns local and use shared hooks, shared UI, and workspace or domain helpers for behavior.

---

### Client Navigation APIs

Use these hooks and components for routing concerns in client code:

```typescript
// Declarative navigation
<Link to="/" />
<NavLink to="/customers/new" />

// Imperative navigation
const navigate = useNavigate();
navigate("/customers/new");
navigate(-1);

// Route state
const navigation = useNavigation();
const isNavigating = navigation.state !== "idle";
const params = useParams();
const [searchParams, setSearchParams] = useSearchParams();
const location = useLocation();

// Route-level error boundary helpers
const error = useRouteError();
isRouteErrorResponse(error);
```

Use `useNavigation()` for global transition UI in layouts:

```typescript
import type { ReactElement } from "react";
import { Outlet, useNavigation } from "react-router";

export default function LayoutShell(): ReactElement {
  const navigation = useNavigation();
  const isNavigating = navigation.state !== "idle";

  return (
    <div>
      {isNavigating && <div className="bg-primary h-1 w-full animate-pulse" />}
      <Outlet />
    </div>
  );
}
```

---

### Essential Hooks Reference

```typescript
// Shared client state
useLocalStorage("workspace", defaultWorkspace);

// React Router hooks
useNavigate();
useNavigation();
useParams();
useSearchParams();
useLocation();

// Root and route error handling
useRouteError();
isRouteErrorResponse(error);
```

---

### Route Data and Client State

Use shared hooks and domain helpers for route-level reads:

```typescript
import type { ReactElement } from "react";
import { Alert } from "~/components/ui/Alert";
import { Skeleton } from "~/components/ui/Skeleton";
import { useLocalStorage } from "~/hooks/use-local-storage";

export default function WorkspacePage(): ReactElement {
  const [workspace] = useLocalStorage("workspace", { items: [] as string[] });

  if (!workspace) {
    return <Skeleton className="h-10 w-full" />;
  }

  if (!Array.isArray(workspace.items)) {
    return <Alert variant="destructive">Workspace data is invalid.</Alert>;
  }

  return <div>{workspace.items.length} item(s)</div>;
}
```

Rules:

- Always render a loading, empty, or fallback state where the UI can be unresolved.
- Always render user-facing error feedback for invalid or failed route-level state.
- Keep read orchestration in route or hook code, not in `routes.ts`.

---

### Form Submission and Client Mutations

Use local handlers, shared setters, and navigation together for route-level writes:

```typescript
import type { FormEvent, ReactElement } from "react";
import { useNavigate } from "react-router";
import { Button } from "~/components/ui/Button";
import { useLocalStorage } from "~/hooks/use-local-storage";

export default function NewItemPage(): ReactElement {
  const navigate = useNavigate();
  const [workspace, setWorkspace] = useLocalStorage("workspace", { items: [] as string[] });

  const handleSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = String(formData.get("title") || "");

    setWorkspace((current) => ({
      ...current,
      items: [...current.items, title],
    }));

    void navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Button type="submit">Create Item</Button>
    </form>
  );
}
```

Rules:

- Keep success and error feedback visible and recoverable.
- Update shared local-first state through the shared hook or shared helper path.
- Do not add fake pending states for synchronous localStorage-backed writes.

---

### Error Boundary Pattern

```typescript
import type { ReactElement } from "react";
import { isRouteErrorResponse, useRouteError } from "react-router";

export function ErrorBoundary(): ReactElement {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return <div>{error.status} {error.statusText}</div>;
  }

  const message = error instanceof Error ? error.message : "Unexpected error";
  return <div>{message}</div>;
}
```

---

### Routing Do/Don't

- Do use `layout`, `index`, and `route` helpers in `app/routes.ts`
- Do keep navigation logic in route and layout modules with Router hooks
- Do keep route modules focused on rendering, navigation, and shared hook orchestration
- Do compose route UI from `app/components/ui/`, `app/components/`, hooks, and domain helpers
- Don't introduce route tree entries outside `app/routes.ts`
- Don't add a parallel client routing system
- Don't bury reusable UI primitives inside route modules

Config requirements to keep:

- `react-router.config.ts` enables `future.v8_viteEnvironmentApi: true`
- `react-router.config.ts` keeps `ssr: false` for SPA mode
- `vite.config.ts` keeps the React Router Vite plugin in place
- `vite.config.ts` stays compatible with the current Vite 8 plus React Compiler setup

---

## Autonomous Task Workflow

You work autonomously on the current task until done.

### Context Management

Re-read files anytime, especially when the conversation is compacted:

- `README.md` for project conventions
- `AGENTS.md` for rules
- current task files for task details
- project-local skills when task instructions reference a skill by name

### Rules

- Always call `task_complete`. Never delete task files manually.
- Run checks only at the very end of each task. Use the narrowest relevant check for scoped changes, and use `npm run check` only when multiple areas were updated.
- For code changes, run `npm run check` before marking a task complete.
- For runtime-affecting UI, route, shared-state, or config changes, also run `npm run build` and verify through `npm run start` before marking a task complete.
- No need to run checks for docs-only or non-code-only updates such as Markdown, copy, comments, or other non-executable content.
- If you feel the conversation is getting long, do not summarize and stop. Keep executing the task.

Example `task_complete` usage:

```bash
node /workspace/mitb/task_complete.mjs --projectId "xyz" --taskId "123" --taskFilePath "/workspace/development/.agent/tasks/00_task-name.md" --status completed --summary "Implemented feature X with Y approach"
```

Use `--status failed` if the task cannot be completed, with a summary explaining why.

### Project Context (Do This First)

- Read `README.md` before making decisions so you understand what the app is, how it runs, and the repo conventions.
- Read `AGENTS.md` for instructions on how to develop with the system.
- If the README points to other sources of truth such as `package.json` or additional docs, read those too.

### Important: Logging and Debugging

- Make full use of the logging system to debug issues.
- Do not remove logging without understanding what shared debugging path it supports.

---

## Task Completion

Before marking work complete:

1. Confirm the requested UI, route, storage, or template behavior is actually implemented.
2. Remove temporary debugging code, one-off console logs, and dead scaffolding added during the task.
3. Run the narrowest relevant validation while iterating, then run `npm run check` before finishing executable code changes.
4. Run `npm run build` when the task affects routes, shared UI, config, or build output expectations.
5. Use `npm run start` for final runtime verification when the changed behavior should be checked in the built app.
6. For docs-only changes, no code validation is required.
7. Call `task_complete` instead of deleting task files manually.
8. In the final handoff, briefly state what changed, what was validated, and any remaining caveats or follow-up work.
