# Data Fetching

## Purpose

This document defines how data is fetched, mutated, cached, and synchronized throughout the Innova-Fit frontend.

The objective is to provide a consistent data flow that separates UI, business logic, and infrastructure while keeping features simple and maintainable.

---

# Core Principles

Data fetching should follow these principles:

* Keep responsibilities separated.
* Prefer composition over duplication.
* Keep UI independent from backend implementation.
* Encapsulate server state inside feature hooks.
* Keep services framework-independent.
* Start simple and promote abstractions only when complexity requires them.

---

# Data Flow

Every feature follows the same data flow.

```text
Next.js Route

        ↓

Feature Page

        ↓

Feature Components

        ↓

Feature Hooks (TanStack Query)

        ↓

Feature Service

        ↓

Laravel API
```

Each layer owns a single responsibility.

---

# Responsibilities

## Feature Page

The page is responsible for:

* Rendering the feature.
* Connecting hooks.
* Managing page-level UI state.
* Displaying loading, error, and empty states.

A page should never communicate directly with the backend.

Example:

```tsx
const {
    data: clients,
    isLoading,
    error,
    refetch,
} = useClients();
```

---

## Feature Hooks

Feature hooks are the only entry point for server state.

Hooks should:

* Use TanStack Query.
* Expose the query or mutation state.
* Manage cache invalidation.
* Connect services with the UI.
* Keep server-state logic out of components and pages.

Hooks should NOT:

* Render UI.
* Perform routing.
* Show notifications.
* Know how the UI presents errors.

One hook should have one responsibility.

Examples:

```text
hooks/

useClients.ts
useClient.ts
useCreateClient.ts
useUpdateClient.ts
useDeleteClient.ts
```

---

## Services

Services communicate with the backend.

Services should only:

* Perform HTTP requests.
* Send request data.
* Return server responses.

Services should NOT:

* Use React.
* Use TanStack Query.
* Access component state.
* Show notifications.
* Invalidate cache.

Services should remain as simple as possible.

Example:

```ts
await clientService.getClients();
await clientService.createClient(data);
```

---

## Next.js API Routes

The frontend can use Next.js API routes when a feature needs a BFF layer, but this is not a required part of every feature.

Use them when the request needs to:

* Forward authentication.
* Hide backend details.
* Normalize external data.
* Keep browser code isolated from backend specifics.

If a feature does not need that layer, the service can communicate with the API client directly.

---

# TanStack Query

TanStack Query is the single source of truth for server state.

Do not duplicate server state inside Zustand or React state.

Use:

* useQuery
* useMutation

for every server interaction.

---

# Query Hooks

Query hooks expose TanStack Query directly.

Example:

```tsx
const {
    data,
    isLoading,
    error,
    refetch,
} = useClients();
```

Avoid wrapping TanStack Query unless additional abstraction provides clear value.

---

# Mutation Hooks

Mutation hooks expose TanStack Query mutations directly.

Example:

```tsx
const {
    mutate: createClient,
    isPending,
    error,
} = useCreateClient();
```

The UI decides when to call the mutation.

---

# Cache Management

Hooks own cache synchronization.

Cache invalidation belongs inside the hook.

Example:

```text
useCreateClient()

        ↓

onSuccess()

        ↓

invalidateQueries()
```

Pages should never invalidate queries directly.

---

# Error Handling

Hooks expose errors.

Example:

```tsx
const {
    mutate,
    error,
} = useCreateClient();
```

The UI decides how errors are presented.

Examples:

* Inline messages.
* Alert components.
* Dialogs.
* Toast notifications.

Hooks should not assume how errors are displayed.

---

# Loading States

Loading state comes directly from TanStack Query.

Example:

```tsx
const {
    isLoading,
} = useClients();
```

Prefer using the project's Skeleton components for loading placeholders.

Avoid custom loading implementations unless necessary.

---

# Query Keys

Start simple.

Prefer local query keys while the feature remains small.

Example:

```ts
queryKey: ["clients"]

queryKey: ["clients", id]
```

Do not introduce shared query key factories prematurely.

When a feature grows significantly (filters, pagination, sorting, multiple list variants), consider promoting query keys into a dedicated file.

Example:

```text
query-keys.ts
```

Follow the project's philosophy:

> Start Simple. Promote Later.

---

# Barrel Files

Feature hook directories may expose an `index.ts` when it improves import clarity.

Example:

```text
hooks/

index.ts

useClients.ts
useClient.ts
useCreateClient.ts
useUpdateClient.ts
useDeleteClient.ts
```

Example:

```ts
export * from "./useClients";
export * from "./useClient";
export * from "./useCreateClient";
export * from "./useUpdateClient";
export * from "./useDeleteClient";
```

This keeps imports clean and predictable.

---

# State Management

Choose the correct state management tool.

## React State

Use for temporary UI state.

Examples:

* Dialog visibility.
* Selected tabs.
* Search input.
* Local filters before submission.

---

## TanStack Query

Use for all server state.

Examples:

* Clients.
* Exercises.
* Templates.
* Workouts.

---

## Zustand

Use only for application-wide state.

Examples:

* Authentication.
* User preferences.
* Global settings.

Never duplicate server state inside Zustand.

---

# Guiding Principles

* Feature hooks are the single entry point for server state.
* Services only communicate with the backend.
* Pages never call services directly.
* Pages never invalidate cache.
* Hooks expose TanStack Query.
* The UI decides how to present errors.
* Keep services framework-independent.
* Prefer simple query keys until complexity justifies abstraction.
* Follow the "Start Simple. Promote Later." philosophy.
* Every layer should have a single responsibility.
