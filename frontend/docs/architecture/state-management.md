# State Management

## Purpose

This document defines where state should live in the Innova-Fit frontend.

The goal is to avoid duplicating server state and keep temporary UI state local.

---

# Core Principles

Choose the smallest state scope that fits the problem:

* Local React state for temporary UI state.
* TanStack Query for server state.
* Zustand only for application-wide state.

---

# Local UI State

Use local React state for temporary interactions.

Examples:

* Dialog visibility.
* Selected tab.
* Expanded sections.
* Search input.
* Local filters before submission.

Feature-specific UI state should stay inside the feature.

---

# Server State

Use TanStack Query for server state.

Examples:

* Exercise list.
* Exercise details.
* Clients.
* Templates.

Server state should be accessed through feature hooks.

Example hooks from `exercises`:

* `use-exercises`
* `use-exercise`
* `use-create-exercise`
* `use-edit-exercise`
* `use-delete-exercise`

Do not duplicate server state in local state or Zustand.

---

# Global State

Use Zustand only for app-wide concerns.

Examples:

* Authentication.
* User preferences.
* Global settings.

Avoid storing feature-specific state globally.

---

# State Ownership

## Pages

Pages may own route-level UI state when needed.

Examples:

* Selected filters.
* Active tab.
* Temporary route interactions.

## Components

Components may own presentation-only state.

Examples:

* Open/close dialog state.
* Local input feedback.

## Hooks

Hooks own server-state coordination.

Examples:

* Fetching lists and details.
* Mutations.
* Cache invalidation.

---

# Guiding Principles

* Keep temporary state local.
* Keep server state in hooks.
* Keep global state rare.
* Do not duplicate data across stores.
* Prefer TanStack Query over custom server-state storage.
