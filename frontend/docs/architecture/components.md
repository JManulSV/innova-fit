# Components

## Purpose

This document defines how UI components are created, organized, and reused throughout the Innova-Fit frontend.

The goal is to build a consistent, maintainable, and predictable component architecture.

Every new component should have a clear responsibility and an obvious place in the project.

---

# Core Principles

Components should:

* Have a single responsibility.
* Be composable.
* Be reusable when appropriate.
* Be easy to understand.
* Prefer existing abstractions over creating new ones.

Avoid creating duplicate UI.

---

# Component Hierarchy

Before creating a new component, follow this order:

```text
shadcn/ui
      ↓
Design System
      ↓
Shared Components
      ↓
Feature Components
      ↓
New Component
```

Always reuse before creating.

---

# Component Selection Priority

## 1. shadcn/ui

Always check whether shadcn/ui already provides the component.

Prefer using existing components such as:

* Button
* Input
* Form
* Dialog
* Alert Dialog
* Card
* Table
* Badge
* Tabs
* Select
* Dropdown Menu
* Popover
* Tooltip
* Sheet
* Skeleton

Do not recreate shadcn/ui components with custom Tailwind unless the design requires behavior or styling that cannot reasonably be achieved by composing or extending them.

---

## 2. Design System

Location:

```text
src/components/design-system/
```

Contains layout primitives and reusable design language.

Examples:

```text
Page
Container
Stack
```

Always use these components instead of recreating layout utilities.

Documentation:

```text
docs/design-system/layout.md
```

---

## 3. Shared Components

Location:

```text
src/components/shared/
```

Contains reusable business-agnostic components used across multiple features.

Examples:

```text
DataTable
EmptyState
SearchInput
ConfirmDialog
LoadingOverlay
```

A shared component should not contain feature-specific logic.

---

## 4. Feature Components

Location:

```text
features/<feature>/components/
```

Contains components used only by a single feature.

Example:

```text
ExerciseCard
ExerciseForm
ExerciseTable
DeleteDialog
```

Feature components may use:

* Design System components.
* Shared components.
* shadcn/ui components.

They should not be imported by unrelated features unless they are promoted to `shared`.

---

# Component Organization

## Small Components

Simple components remain as a single file.

Example:

```text
components/

DeleteDialog.tsx

ExerciseCard.tsx
```

Keep the implementation concise and focused.

---

## Large Components

Complex components should have their own directory.

Example:

```text
components/

exercise-table/

├── ExerciseTable.tsx
├── ExerciseTable.columns.tsx
├── ExerciseTable.types.ts
└── index.ts
```

Another example:

```text
components/

exercise-form/

├── ExerciseForm.tsx
├── ExerciseFormFields.tsx
├── ExerciseForm.types.ts
└── index.ts
```

Create a dedicated directory when a component:

* Has multiple files.
* Contains subcomponents.
* Has custom types.
* Has configuration.
* Has complex internal logic.

---

# Component Responsibilities

A component is responsible for:

* Rendering UI.
* Handling user interaction.
* Composing smaller components.
* Receiving data through props.
* Emitting events.

Components should remain focused on presentation.

---

# What Components Should NOT Do

Components should not:

* Perform API requests directly.
* Contain business logic.
* Access backend services.
* Duplicate validation logic.
* Duplicate server state.

Instead, use feature hooks.

Flow:

```text
Page

↓

Component

↓

Feature Hook

↓

Service

↓

Laravel API
```

---

# Props

Components should receive everything they need through props whenever possible.

Avoid hidden dependencies.

Prefer:

```tsx
<ExerciseCard exercise={exercise} />
```

Instead of:

```tsx
const exercise = useExerciseStore();
```

unless the component is specifically designed to work with global state.

---

# Reusability

A component should only become shared when it is actually reused.

Promotion strategy:

```text
Feature

↓

Shared
```

Do not create shared abstractions prematurely.

---

# Naming Conventions

Use PascalCase for component names.

Examples:

```text
ExerciseCard

ExerciseForm

DeleteDialog

ClientAvatar
```

Component folders should use kebab-case.

Examples:

```text
exercise-table/

exercise-form/

client-selector/
```

The main component should match the folder name.

Example:

```text
exercise-table/

ExerciseTable.tsx
```

---

# Styling

Styling should follow the project's Design System.

Before adding custom spacing or layout:

1. Check the Design System.
2. Check existing layout primitives.
3. Use Container, Page and Stack whenever appropriate.

Avoid arbitrary spacing values.

Theme values are defined in:

```text
src/app/globals.css
```

Do not redefine design tokens inside components.

---

# Component Checklist

Before creating a new component, ask:

1. Does shadcn/ui already provide it?
2. Does the Design System already solve this?
3. Does a shared component already exist?
4. Does the feature already contain something similar?
5. Can I extend an existing component instead?

Only create a new component if the answer to all previous questions is "No".

---

# Guiding Principles

* Prefer composition over duplication.
* Keep components small and focused.
* Keep business logic outside the UI.
* Reuse before creating.
* Promote components only when reuse is proven.
* Follow the Design System.
* Prefer shadcn/ui whenever possible.
* Every component should have a single responsibility.
