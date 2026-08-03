# Components Architecture

## Purpose

This document defines the architecture, responsibilities and conventions for every React component in Innova-Fit.

The objective is to build a frontend that is:

* Consistent
* Maintainable
* Scalable
* Predictable
* Easy to understand for both developers and AI assistants.

These guidelines apply to every component in the project.

---

# Philosophy

Components are **building blocks**.

Every screen should be assembled from small, reusable components with a single responsibility.

Before creating a new component, always ask:

> **Can an existing component solve this problem?**

If the answer is yes, prefer extending or composing the existing component instead of creating a new one.

---

# Design System

Innova-Fit uses **shadcn/ui** as the foundation of its Design System.

Before creating a new UI primitive:

1. Verify whether shadcn/ui already provides the component.
2. Prefer composing or extending existing shadcn components.
3. Avoid recreating components that already exist.

Create a custom primitive only when:

* The component does not exist in shadcn/ui.
* The application requires project-specific behavior.
* Composition is not enough to satisfy the requirements.

Whenever possible, composition should be preferred over customization.

---

# Component Hierarchy

Every component belongs to one of the following architectural layers.

```text
Pages
    ↓
Feature Components
    ↓
Shared Components
    ↓
Design System Components
    ↓
UI Components (shadcn/ui)
```

Dependencies always flow downward.

Lower layers must never depend on higher layers.

---

# UI Components

## Purpose

UI Components are the lowest level of the application.

They should be generic, reusable and independent from the business domain.

Whenever possible, use **shadcn/ui** components instead of creating new primitives.

Examples:

* Button
* Input
* Select
* Dialog
* Badge
* Tooltip
* Checkbox
* Skeleton

### Responsibilities

A UI Component should only:

* Render UI
* Expose reusable props
* Handle visual states
* Remain accessible

### Must NOT

* Fetch data
* Know business entities
* Import Feature Components
* Contain application-specific logic

---

# Design System Components

## Purpose

Design System Components standardize the application's layout and visual consistency.

Examples:

* Page
* Container
* Stack

These components provide reusable layout primitives that define:

* spacing
* widths
* alignment
* page structure

Before creating custom layouts or spacing utilities, verify whether an existing Design System component already solves the problem.

Detailed documentation is available in:

`docs/design-system/layout.md`

---

# Shared Components

## Purpose

Shared Components contain business-related UI that is reused across multiple features.

Examples:

* MetricCard
* SearchBar
* EmptyState
* DeleteDialog
* ClientAvatar

A Shared Component may:

* Receive domain models
* Use custom hooks
* Display business information

A Shared Component should remain generic enough to be reused by different features.

If a component is reused by multiple features, it belongs in:

```text
src/components/shared
```

---

# Feature Components

## Purpose

Feature Components belong to a single feature.

Examples:

* ExerciseTable
* ExerciseForm
* ExerciseFilters
* ExerciseDeleteDialog

Feature Components may:

* Use TanStack Query
* Use React Hook Form
* Use feature-specific hooks
* Handle mutations
* Manage feature state

If a component is only used inside one feature, it should remain inside that feature.

---

# Page Components

Pages compose the application.

Their responsibility is assembling Feature Components into a complete user interface.

Pages should contain as little business logic as possible.

Business logic belongs in:

* hooks
* services
* feature components

---

# Dependency Rules

Allowed

```text
Pages
    ↓
Feature Components
    ↓
Shared Components
    ↓
Design System Components
    ↓
UI Components
```

Not Allowed

```text
UI Components
    ↓
Feature Components
```

A lower-level component must never import a higher-level component.

---

# Single Responsibility Principle

Every component should have exactly one reason to change.

If a component is responsible for:

* rendering UI
* fetching data
* validating forms
* opening dialogs
* handling mutations

it should probably be split into multiple components.

---

# Composition over Configuration

Prefer composing components instead of creating highly configurable ones.

Good

```tsx
<Card>
    <CardHeader />
    <CardContent />
    <CardFooter />
</Card>
```

Avoid components with dozens of configuration props.

---

# Reusability

Do not create reusable components preemptively.

A component should usually become reusable after it has appeared in multiple places.

Promote components gradually.

The typical lifecycle is:

```text
Screen Component
        ↓
Feature Component
        ↓
Shared Component
```

This approach avoids premature abstraction.

---

# Component Location

The detailed folder organization is documented in:

`docs/architecture/folders.md`

As a general rule:

* Components used by a single screen stay inside that screen.
* Components reused within a feature belong to that feature.
* Components reused across multiple features belong to `src/components/shared`.
* UI primitives belong to `src/components/ui`.
* Layout primitives belong to `src/components/design-system`.

---

# Component Folder Structure

Large reusable components should use their own folder.

```text
ExerciseCard/

    ExerciseCard.tsx
    ExerciseCard.types.ts
    ExerciseCard.docs.md
    index.ts
```

Small UI primitives may remain as a single file when appropriate.

---

# Props

Props should be explicit.

Good examples:

* variant
* size
* loading
* disabled

Avoid generic props such as:

* config
* options
* data

unless they represent an actual domain model.

---

# Styling

All styling must follow the project's Design System.

Theme tokens, colors, spacing and typography are defined in:

`src/app/globals.css`

Components should reuse those tokens instead of introducing arbitrary visual values.

Prefer existing Design System components before adding custom spacing or layout classes.

---

# Accessibility

Interactive components must support:

* Keyboard navigation
* Focus states
* Disabled states
* Appropriate ARIA attributes when necessary

Accessibility is a requirement, not an optional enhancement.

---

# Documentation

Every reusable component should include documentation describing:

* Purpose
* Responsibilities
* When to use it
* When not to use it
* Props
* Examples

Documentation is considered part of the component.

---

# Before Creating a New Component

Before implementing a new component, verify:

1. Does shadcn/ui already provide it?
2. Can an existing Design System component solve the layout?
3. Does a Shared Component already exist?
4. Is the component specific to a single feature?
5. Does it have only one responsibility?

If the answer is unclear, create it inside the feature first.

It can always be promoted later.

---

# Core Principle

A component should be:

* Easy to understand
* Easy to maintain
* Easy to replace
* Easy to remove

Small, focused and composable components are always preferred over large, highly configurable ones.
