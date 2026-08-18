# Routing

## Purpose

This document defines how application routes are organized in the Innova-Fit frontend.

The goal is to keep `src/app/` thin and predictable while delegating real UI composition to feature pages.

---

# Core Principles

Routes should:

* Stay minimal.
* Delegate rendering to feature pages.
* Avoid business logic.
* Avoid data fetching.
* Keep route-specific wrappers close to the route.

---

# Route Structure

Routes live in `src/app/` and map directly to URL segments.

Example coach routes:

```text
app/

├── coach/
│   ├── dashboard/page.tsx
│   ├── exercises/page.tsx
│   ├── exercises/create/page.tsx
│   ├── exercises/[id]/page.tsx
│   └── exercises/[id]/edit/page.tsx
```

Example client routes:

```text
app/

├── client/
│   ├── dashboard/page.tsx
│   ├── workout/page.tsx
│   └── profile/page.tsx
```

---

# Route Responsibilities

Route files should:

* Import the corresponding feature page.
* Render that page.
* Provide route-level composition only when necessary.

Example:

```tsx
export default function Page() {
  return <ExercisesPage />;
}
```

Route files should NOT:

* Fetch feature data.
* Contain business rules.
* Recreate feature UI.
* Own form state.

---

# Route Types

## List Routes

Used for overview screens.

Examples:

* `coach/exercises/page.tsx`
* `coach/clients/page.tsx`
* `coach/templates/page.tsx`

## Create Routes

Used for new records.

Examples:

* `coach/exercises/create/page.tsx`
* `coach/clients/create/page.tsx`
* `coach/templates/create/page.tsx`

## Details Routes

Used for record inspection.

Examples:

* `coach/exercises/[id]/page.tsx`
* `coach/clients/[id]/page.tsx`
* `coach/templates/[id]/page.tsx`

## Edit Routes

Used for record updates.

Examples:

* `coach/exercises/[id]/edit/page.tsx`
* `coach/clients/[id]/edit/page.tsx`
* `coach/templates/[id]/edit/page.tsx`

---

# Loading And Error Files

Use Next.js route conventions when the screen needs them.

Examples:

* `loading.tsx` for route loading states.
* `error.tsx` for route-level failures.

Keep these files route-specific. Do not move feature logic into them.

---

# Layouts

Use `layout.tsx` for route group structure and shared navigation shells.

Examples:

* `app/coach/layout.tsx`
* `app/client/layout.tsx`

Layouts should wrap routes, not implement feature behavior.

---

# API Routes

`src/app/api/` is reserved for backend-facing route handlers.

Examples:

* `api/exercises/route.ts`
* `api/exercises/[id]/route.ts`
* `api/auth/login/route.ts`

API routes should remain thin and only handle transport concerns.

---

# Guiding Principles

* Routes map URLs to feature pages.
* Feature pages compose the screen.
* Layouts define route shells.
* API routes handle transport, not business logic.
* Keep `src/app/` thin.
