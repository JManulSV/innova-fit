# Forms

## Purpose

This document defines how forms are structured in the Innova-Fit frontend.

The goal is to keep form logic inside feature folders and make complex forms easy to extend.

---

# Core Principles

Forms should:

* Keep field groups organized.
* Separate validation from UI.
* Keep submission logic in hooks.
* Reuse sections when a form grows.
* Stay close to the feature that owns them.

---

# Form Pattern

Large feature forms should be organized inside a dedicated folder.

Example from `exercises`:

```text
components/

exercise-form/
├── ExerciseForm.tsx
├── ExerciseFormError.tsx
├── ExerciseFormSkeleton.tsx
├── constants.ts
└── components/
    ├── GeneralInfoSection.tsx
    ├── InstructionsSection.tsx
    ├── MuscleGroupsSection.tsx
    └── FormActions.tsx
```

This pattern keeps the main form focused while allowing sections to stay isolated.

---

# Form Responsibilities

## Main Form

The main form component should:

* Wire the form fields together.
* Receive values and handlers through props or hooks.
* Compose sections.
* Trigger submit and cancel actions.

It should NOT:

* Contain validation rules.
* Call services directly.
* Hold server-state logic.

## Section Components

Section components should:

* Group related inputs.
* Keep large forms readable.
* Stay presentation-focused.

Examples from `exercises`:

* `GeneralInfoSection`
* `InstructionsSection`
* `MuscleGroupsSection`

## Actions

Form actions should live in a dedicated component when submit/cancel behavior becomes non-trivial.

Example:

* `FormActions`

## Errors And Skeletons

Use dedicated components for stateful form feedback.

Examples:

* `ExerciseFormError`
* `ExerciseFormSkeleton`

---

# Validation

Validation schemas belong to the owning feature.

Example:

```text
schemas/
└── exercise.schema.ts
```

Schemas should define:

* Field constraints.
* Input validation.
* Data transformation when needed.

Do not duplicate validation rules inside form components.

---

# Submission Flow

Recommended flow:

```text
Form UI

↓

Feature Hook

↓

Feature Service

↓

Backend
```

Use feature hooks for create, edit, and delete mutations.

---

# When To Split A Form

Create a dedicated folder when a form has:

* Multiple sections.
* Repeated field groups.
* Custom configuration.
* Complex validation.
* Distinct loading or error states.

---

# Guiding Principles

* Keep forms close to the feature.
* Keep validation in schemas.
* Keep submission in hooks.
* Break large forms into sections.
* Use dedicated error and skeleton components when needed.
