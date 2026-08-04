# Feature Architecture

## Purpose

This document defines how business features are designed and implemented in the Innova-Fit frontend.

A feature represents a complete business capability of the application.

The objective is to create features that are:

* Independent.
* Maintainable.
* Predictable.
* Easy to extend.
* Consistent across the project.

The directory structure is documented in `folders.md`. This document focuses on responsibilities and data flow.

---

# Core Principles

Every feature should:

* Solve a single business capability.
* Keep related code together.
* Reuse existing abstractions whenever possible.
* Follow the project's Design System.
* Keep business logic outside of UI components.

A feature should be understandable without reading unrelated parts of the application.

---

# What is a Feature?

A feature encapsulates everything required to implement a business domain.

Examples:

```text
features/

├── auth/
├── clients/
├── exercises/
├── templates/
└── workouts/
```

Each feature owns its:

* Pages.
* Components.
* Hooks.
* Services.
* Validation schemas.
* Types.

---

# Data Flow

Every feature follows the same flow.

```text
Next.js Route

        ↓

Feature Page

        ↓

Feature Components

        ↓

Feature Hooks

        ↓

Feature Services

        ↓

Laravel API
```

Each layer has a single responsibility.

---

# Pages

## Purpose

Pages represent complete application views.

A page is rendered by a Next.js route and is responsible for composing the user interface.

Examples:

```text
ListPage

CreatePage

DetailsPage

EditPage
```

Pages should:

* Compose feature components.
* Connect feature hooks.
* Coordinate user interactions.
* Manage page-level UI state.

Pages should NOT:

* Make HTTP requests.
* Contain business logic.
* Implement validation rules.
* Duplicate reusable UI.

Pages orchestrate the feature; they do not implement it.

---

# Components

## Purpose

Components build the feature's user interface.

Examples:

* ExerciseForm
* ExerciseTable
* DeleteDialog
* ExerciseCard

Components should:

* Render UI.
* Receive data through props.
* Handle user interactions.
* Compose smaller components.

Components should NOT:

* Call backend services directly.
* Perform HTTP requests.
* Contain business logic.
* Manage server state.

When possible, use:

1. shadcn/ui
2. Design System
3. Shared Components
4. Feature Components

before creating new UI.

---

# Hooks

## Purpose

Hooks connect the UI with the business layer.

Hooks are the entry point for every data operation.

Examples:

```text
useExercises()

useExercise()

useCreateExercise()

useUpdateExercise()
```

Hooks may:

* Use TanStack Query.
* Coordinate mutations.
* Transform data for the UI.
* Connect services.

Hooks should NOT:

* Render UI.
* Perform routing.
* Contain JSX.

---

# Services

## Purpose

Services communicate with the backend.

Examples:

```text
exercise.service.ts

client.service.ts

template.service.ts
```

Services are responsible for:

* HTTP requests.
* Request formatting.
* Response transformation.

Services should remain framework-independent whenever possible.

Services should NOT:

* Use React hooks.
* Access component state.
* Render UI.

---

# Types

Each feature owns its own TypeScript types.

Examples:

```text
types.ts
```

Types define:

* Domain models.
* API contracts.
* Form values.

If the file becomes difficult to maintain, it may be promoted into a `types/` directory.

Avoid creating global business types unless they are shared across multiple features.

---

# Validation Schemas

Each feature owns its validation schemas.

Examples:

```text
schemas.ts
```

Schemas define:

* Form validation.
* Input constraints.
* Data transformations.

If the file grows significantly, it may be promoted into a `schemas/` directory.

Validation should not be duplicated inside components.

---

# State Management

Choose the appropriate tool depending on the type of state.

## Local UI State

Use React state.

Examples:

* Dialog visibility.
* Selected tab.
* Expanded sections.
* Temporary interactions.

Tools:

* useState
* useReducer

---

## Server State

Use TanStack Query.

Examples:

* Exercise list.
* Clients.
* Templates.
* Progress history.

Do not duplicate server state inside Zustand.

---

## Global State

Use Zustand only for application-wide state.

Examples:

* Authentication.
* User preferences.
* Global settings.

Avoid storing temporary page state globally.

---

# Reusability

Start local.

Promote only when reuse is proven.

Promotion flow:

```text
Feature

      ↓

Shared
```

Do not create abstractions before they are needed.

---

# Feature Documentation

General architecture lives in:

```text
docs/

architecture/

design-system/
```

A feature may include a `README.md` only when it contains:

* Complex business rules.
* Important workflows.
* Architectural decisions.
* Domain-specific documentation.

Avoid creating README files that only describe obvious functionality.

---

# Creating a New Feature

Before implementing a feature:

1. Define the business capability.
2. Identify existing reusable components.
3. Review the Design System.
4. Review available shadcn/ui components.
5. Reuse existing hooks and services whenever possible.
6. Keep Pages focused on composition.
7. Keep business logic inside Hooks.
8. Keep API communication inside Services.

---

# Guiding Principles

* Features own business logic.
* Pages compose the interface.
* Components build the UI.
* Hooks connect the UI with business logic.
* Services communicate with Laravel.
* Prefer reuse over duplication.
* Prefer composition over abstraction.
* Follow the Design System.
* Prefer shadcn/ui whenever possible.
* Every file should have a single responsibility.
