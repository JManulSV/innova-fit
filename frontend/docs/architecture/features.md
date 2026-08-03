# Feature Architecture

## Purpose

This document defines how business features are structured and developed in the Innova-Fit frontend.

A feature represents a self-contained business capability of the application.

The objective is to create features that are:

* Independent.
* Easy to understand.
* Easy to maintain.
* Scalable.
* Predictable for developers and AI assistants.

---

# Core Principle

## Features are business modules

A feature contains everything required to implement a specific business capability.

Examples:

```text
features/

├── exercises/
├── clients/
├── templates/
├── workouts/
└── auth/
```

Each feature owns:

* Screens.
* Components.
* Hooks.
* Services.
* Schemas.
* Types.
* Utils.
* Constants.
* Feature-specific state.

---

# Feature Philosophy

## Local First, Promote Later

Code should start as close as possible to where it is used.

Do not create shared abstractions before reuse exists.

The promotion flow is:

```text
Screen
   ↓
Feature
   ↓
Shared
```

Example:

A component used only in exercise creation:

```text
screens/create/components/
```

When reused by another exercise screen:

```text
features/exercises/components/
```

When reused by another feature:

```text
components/shared/
```

This rule applies to:

* Components.
* Hooks.
* Utils.
* Schemas.
* Types.
* Constants.

---

# Feature Structure

A typical feature follows this structure:

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
    ├── constants/
    └── stores/
```

Not every feature requires every folder.

Create folders only when they are needed.

---

# Screens

## Purpose

A Screen represents a complete application page.

A Screen corresponds to a user-facing route or navigable view.

Examples:

```text
features/exercises/

screens/

├── list/
├── create/
└── edit/
```

Examples:

```text
CreateExerciseScreen

ExerciseListScreen

EditExerciseScreen
```

---

## Screen Responsibilities

Screens are composition layers.

They are responsible for:

* Composing components.
* Connecting feature hooks.
* Coordinating user flows.
* Managing screen-specific UI state.

---

## Screens should NOT

Screens should not:

* Make API requests directly.
* Contain business rules.
* Contain complex validation logic.
* Implement reusable logic.

The rule:

> Screens coordinate the feature, but they do not own business logic.

---

# Component Organization

Components follow the same promotion strategy.

## Screen Components

Components used by only one screen belong to that screen.

Example:

```text
screens/create/

components/

└── ExercisePreview.tsx
```

---

## Feature Components

Components reused by multiple screens inside the same feature belong to the feature.

Example:

```text
features/exercises/

components/

├── ExerciseCard.tsx
├── ExerciseTable.tsx
└── ExerciseFilters.tsx
```

---

## Shared Components

Components reused by multiple features belong to:

```text
src/components/shared
```

Only promote components when reuse is proven.

---

# Component Organization Style

Innova-Fit uses a mixed approach.

## Small components

Simple components remain as single files.

Example:

```text
components/

└── MuscleBadge.tsx
```

---

## Complex components

Large components receive their own folder.

Example:

```text
components/

└── exercise-table/

    ├── ExerciseTable.tsx
    ├── ExerciseTable.columns.tsx
    ├── ExerciseTable.types.ts
    └── index.ts
```

A component deserves a folder when it has:

* Multiple related files.
* Custom types.
* Configuration.
* Complex logic.
* Subcomponents.

---

# Hooks

## Purpose

Hooks connect the UI layer with feature logic.

The flow is:

```text
Component

    ↓

Feature Hook

    ↓

Service

    ↓

Laravel API
```

---

## Hook Location

Follow the promotion strategy.

Example:

Only one screen:

```text
screens/create/hooks/
```

Multiple screens:

```text
features/exercises/hooks/
```

Multiple features:

```text
src/hooks/
```

---

# Services

## Purpose

Services handle communication with the backend.

Example:

```text
features/exercises/

services/

└── exercise.service.ts
```

---

## Services are responsible for:

* API requests.
* Request formatting.
* Response transformation.

---

## Services are NOT responsible for:

* React logic.
* UI state.
* Notifications.
* Component behavior.

---

# Schemas

## Purpose

Schemas define validation rules.

Schemas follow the Local First principle.

---

## Screen schema

Only one screen uses it:

```text
screens/create/schemas/
```

---

## Feature schema

Multiple screens use it:

```text
features/exercises/schemas/
```

---

## Global schema

Only for application-wide concepts:

```text
src/schemas/
```

Avoid placing business-specific schemas globally.

---

# Types

## Purpose

Types define contracts between layers.

Types follow the same promotion strategy.

---

## Screen types

Only one screen:

```text
screens/create/types/
```

---

## Feature types

Multiple screens:

```text
features/exercises/types/
```

---

## Global types

Only shared application concepts:

```text
src/types/
```

Avoid creating global business types prematurely.

---

# State Management

Innova-Fit separates state by responsibility.

---

# Local UI State

Use React state for temporary UI behavior.

Examples:

* Modal visibility.
* Selected tabs.
* Dropdown state.
* Temporary interactions.

Tools:

* useState.
* useReducer.

---

# Server State

Server data belongs to TanStack Query.

Examples:

* Exercises.
* Clients.
* Workout templates.
* Progress data.

Flow:

```text
Component

↓

Feature Hook

↓

TanStack Query

↓

Laravel API
```

Do not duplicate server state inside Zustand.

---

# Global Application State

Use Zustand only for truly global state.

Examples:

* Authentication.
* Preferences.
* Application settings.

Location:

```text
src/stores/
```

---

# Feature State

Feature-specific shared workflows may use feature stores.

Example:

```text
features/workouts/

stores/

└── workout-builder.store.ts
```

Use this only when multiple screens need the same temporary feature state.

---

# Feature Documentation

Feature documentation is optional.

General architecture is documented in:

```text
docs/
```

A feature may contain a README.md when it has:

* Complex business rules.
* Important workflows.
* Architectural decisions.

Example:

```text
features/

└── billing/

    ├── README.md
    ├── screens/
    ├── hooks/
    └── services/
```

Avoid creating README files that only describe obvious functionality.

---

# Creating a New Feature Checklist

Before creating a new feature:

1. Define the business capability.
2. Create the feature folder.
3. Add only required directories.
4. Start code locally.
5. Promote reusable code only when necessary.
6. Keep screens focused on composition.
7. Keep business logic inside hooks/services.

---

# Core Principle

A feature should clearly communicate:

* What business problem it solves.
* Where its logic lives.
* How its data flows.
* How it can evolve.

The best architecture is not the one with the most abstractions.

It is the one where every piece has an obvious place.
