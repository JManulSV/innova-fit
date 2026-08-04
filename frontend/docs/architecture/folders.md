# Folder Structure

## Purpose

This document defines the directory structure used throughout the Innova-Fit frontend.

The goal is to create a predictable architecture where every file has an obvious place.

The project separates:

* Application routing.
* Business features.
* Shared UI.
* Global utilities.
* Documentation.

---

# High-Level Structure

```text
src/

├── app/
├── components/
├── features/
├── lib/
├── providers/
├── stores/
├── hooks/
├── types/
├── utils/
└── ...
```

Each directory has a single responsibility.

---

# app/

## Purpose

The `app` directory defines the application's routes using the Next.js App Router.

It should remain as thin as possible.

Route files should delegate rendering to the corresponding Feature Page.

Example:

```text
app/

└── dashboard/

    └── exercises/

        ├── page.tsx

        ├── create/
        │   └── page.tsx

        ├── [id]/
        │   ├── page.tsx
        │   └── edit/
        │       └── page.tsx
```

Example:

```tsx
export default function Page() {
  return <ExerciseListPage />;
}
```

The route should not contain business logic.

---

# features/

## Purpose

A feature represents a business capability of the application.

Each feature owns everything required to implement that domain.

Example:

```text
features/

└── exercises/

    ├── pages/
    ├── components/
    ├── hooks/
    ├── services/
    ├── schemas.ts
    └── types.ts
```

Features should remain independent whenever possible.

---

# Feature Structure

## pages/

Contains page-level components.

Each page represents a complete screen of the application.

Example:

```text
pages/

├── ListPage.tsx
├── CreatePage.tsx
├── DetailsPage.tsx
└── EditPage.tsx
```

Pages are responsible for:

* Composing the UI.
* Connecting feature hooks.
* Managing page-level UI state.

Pages should not contain business logic or API communication.

---

## components/

Contains reusable UI components that belong to the feature.

### Small components

Small components remain as a single file.

Example:

```text
components/

├── DeleteDialog.tsx
├── ExerciseCard.tsx
└── ExerciseBadge.tsx
```

---

### Large components

Complex components should own their own directory.

Example:

```text
components/

exercise-table/

├── ExerciseTable.tsx
├── ExerciseTable.columns.tsx
├── ExerciseTable.types.ts
└── index.ts
```

Example:

```text
components/

exercise-form/

├── ExerciseForm.tsx
├── ExerciseFormFields.tsx
├── ExerciseForm.types.ts
└── index.ts
```

Create a dedicated folder when a component:

* Has multiple files.
* Has subcomponents.
* Has custom types.
* Has configuration.
* Has complex logic.

---

## hooks/

Contains feature hooks.

Hooks connect the UI with the business layer.

Example:

```text
hooks/

├── useExercises.ts
├── useExercise.ts
├── useCreateExercise.ts
└── useUpdateExercise.ts
```

Hooks are the entry point for data operations.

Pages and components should never communicate directly with services.

---

## services/

Contains communication with the backend.

Example:

```text
services/

└── exercise.service.ts
```

Responsibilities:

* HTTP requests.
* Request formatting.
* Response transformation.

Services should not contain React logic.

---

## schemas.ts

Contains feature validation schemas.

If the file becomes large, promote it into a folder.

Example:

```text
schemas/

├── create-exercise.schema.ts
└── update-exercise.schema.ts
```

Do not split prematurely.

---

## types.ts

Contains feature TypeScript types.

If the file grows significantly, promote it into a folder.

Example:

```text
types/

├── exercise.types.ts
├── exercise-form.types.ts
└── exercise-api.types.ts
```

Do not split until it improves readability.

---

# components/

Contains reusable components shared across multiple features.

Example:

```text
components/

├── design-system/
│
│   ├── page.tsx
│   ├── container.tsx
│   ├── stack.tsx
│   └── ...
│
├── shared/
│
│   ├── DataTable.tsx
│   ├── EmptyState.tsx
│   └── ...
│
└── ui/
```

---

## ui/

Contains shadcn/ui components.

These components should be preferred over custom implementations whenever possible.

Before creating a custom component, verify whether an equivalent shadcn/ui component already exists.

Avoid recreating:

* Button
* Input
* Dialog
* Card
* Table
* Select
* Dropdown Menu
* Badge
* Form
* Tabs

unless the design requires custom behavior.

---

# providers/

Contains application-wide providers.

Example:

```text
providers/

QueryProvider

ThemeProvider

SessionProvider
```

---

# stores/

Contains global Zustand stores.

Only application-wide state belongs here.

Examples:

* Authentication.
* User preferences.
* Global settings.

Feature-specific state should remain inside its feature when appropriate.

---

# hooks/

Contains reusable hooks shared by multiple features.

Do not place feature-specific hooks here.

---

# lib/

Contains shared libraries and application infrastructure.

Examples:

* Axios instance.
* Utilities for API communication.
* Shared helper libraries.

---

# types/

Contains application-wide types shared across multiple features.

Avoid placing business-specific types here.

---

# utils/

Contains generic helper functions shared across the application.

Do not place feature-specific utilities here.

---

# Documentation

Architecture documentation lives inside:

```text
docs/

architecture/

design-system/
```

Features may include a `README.md` only when they contain complex business rules or workflows.

---

# Guiding Principles

1. Keep route files thin.
2. Features own business logic.
3. Prefer composition over duplication.
4. Keep code close to where it belongs.
5. Promote files only when reuse is proven.
6. Prefer existing Design System and shadcn/ui components.
7. Every directory should have a single responsibility.
