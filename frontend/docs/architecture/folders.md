# Folder Architecture

## Purpose

This document defines the directory structure used throughout the Innova-Fit frontend.

Its goal is to keep the project:

* Predictable
* Easy to navigate
* Scalable
* Consistent

Every new file should have a clear and predictable location.

---

# Core Principle

Files should live as close as possible to the feature that owns them.

Promote code only when it becomes reusable.

Avoid placing files in shared folders "just in case".

---

# Project Structure

```text
src/

├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── providers/
├── stores/
├── types/
└── utils/
```

Each top-level directory has a single responsibility.

---

# app/

Contains the application's routes using the Next.js App Router.

Responsibilities:

* Define routes.
* Configure layouts.
* Configure route groups.
* Mount feature screens.

Pages should contain little or no business logic.

Example:

```text
app/

└── (coach)/
    └── exercises/
        └── create/
            └── page.tsx
```

```tsx
export default function Page() {
  return <CreateExerciseScreen />;
}
```

---

# components/

Contains reusable components shared outside a single feature.

```text
components/

├── ui/
├── design-system/
└── shared/
```

## ui/

Contains generic UI primitives.

Examples:

* Button
* Input
* Dialog
* Badge

Whenever possible, these should come directly from shadcn/ui.

---

## design-system/

Contains layout and visual primitives used throughout the application.

Examples:

* Page
* Container
* Stack
* PageHeader

These components standardize layout and spacing.

---

## shared/

Contains business-aware components reused across multiple features.

Examples:

* EmptyState
* DeleteDialog
* MetricCard
* SearchBar

A component should only be promoted here after being reused by multiple features.

---

# features/

Each business domain owns its own feature.

Examples:

```text
features/

├── exercises/
├── clients/
├── templates/
└── auth/
```

A feature owns:

* Screens
* Components
* Hooks
* Services
* Types
* Schemas
* Utilities

A feature should be as self-contained as possible.

---

# Feature Structure

A typical feature should follow this structure.

```text
features/

└── exercises/

    ├── screens/
    ├── components/
    ├── hooks/
    ├── services/
    ├── schemas/
    ├── types/
    ├── utils/
    └── constants/
```

---

## screens/

Contains complete application screens.

Example:

```text
screens/

├── list/
├── create/
└── edit/
```

Each screen owns everything that is exclusive to that screen.

Example:

```text
create/

├── CreateExerciseScreen.tsx
├── components/
├── hooks/
└── utils/
```

A screen should compose components, not contain large amounts of business logic.

---

## components/

Contains components reused by multiple screens within the same feature.

Examples:

* ExerciseCard
* ExerciseSelector
* ExerciseMuscleBadge

If a component is only used by one screen, keep it inside that screen.

---

## hooks/

Contains hooks specific to the feature.

Examples:

* useExercises
* useCreateExercise
* useDeleteExercise

Hooks should encapsulate reusable business logic.

---

## services/

Contains API communication.

Responsibilities:

* HTTP requests
* Request transformations
* Response transformations

Services should not contain UI logic.

---

## schemas/

Contains validation schemas.

Examples:

* exercise.schema.ts
* client.schema.ts

Prefer Zod for schema validation.

---

## types/

Contains feature-specific TypeScript types.

Examples:

* Exercise
* ExerciseFormValues

Avoid duplicating shared types.

---

## utils/

Contains pure helper functions.

Utilities should:

* Have no side effects.
* Not depend on React.
* Not depend on UI.

---

## constants/

Contains feature-specific constants.

Examples:

* Exercise categories.
* Default form values.
* Limits.
* Labels.

---

# hooks/

Contains hooks shared across the entire application.

Only place a hook here if it is reused by multiple features.

---

# lib/

Contains application infrastructure.

Examples:

* API clients
* Helper libraries
* External integrations

Business logic does not belong here.

---

# providers/

Contains global React providers.

Examples:

* ThemeProvider
* QueryProvider
* SessionProvider

---

# stores/

Contains global application state.

Only truly global state belongs here.

Examples:

* Authentication
* Theme
* Preferences

Avoid storing feature-specific state globally.

---

# types/

Contains shared TypeScript types.

Only place a type here when it is reused across multiple features.

---

# utils/

Contains application-wide utility functions.

Utilities should be generic and framework-independent whenever possible.

---

# Promotion Rules

A file should move only when its responsibility grows.

Typical evolution:

```text
Screen

↓

Feature

↓

Shared
```

Examples:

```text
screens/create/components/

↓

features/exercises/components/

↓

components/shared/
```

Avoid promoting code before it is actually reused.

---

# Decision Guide

| Question                                      | Location                         |
| --------------------------------------------- | -------------------------------- |
| Is it a Next.js route?                        | `app/`                           |
| Is it a screen?                               | `features/<feature>/screens/`    |
| Used by one screen only?                      | `screens/<screen>/components/`   |
| Used by multiple screens of the same feature? | `features/<feature>/components/` |
| Used by multiple features?                    | `components/shared/`             |
| Generic UI primitive?                         | `components/ui/`                 |
| Layout primitive?                             | `components/design-system/`      |
| API communication?                            | `services/`                      |
| Form validation?                              | `schemas/`                       |
| Business hook?                                | `hooks/`                         |
| Pure helper?                                  | `utils/`                         |

---

# Core Principle

The location of a file should communicate its responsibility.

If it is difficult to decide where a file belongs, it is often a sign that its responsibility is not yet well defined.
