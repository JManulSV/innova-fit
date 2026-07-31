# Layout System

This document describes the layout primitives used throughout the Innova-Fit
frontend. These components are intentionally small and composable — they solve
recurrent layout needs without duplicating Tailwind utilities across pages.

---

## Hierarchy

A typical page uses the following structure:

```tsx
<CoachShell>          {/* or ClientShell / AuthLayout: semantic <main> */}
  <Page>
    <Container>
      <PageHeader>
        <PageTitleGroup>
          <PageTitle>Clients</PageTitle>
          <PageDescription>Manage your client roster</PageDescription>
        </PageTitleGroup>
        <PageActions>
          <Button>Add Client</Button>
        </PageActions>
      </PageHeader>

      <Stack gap="8">
        <section>...</section>
        <section>...</section>
      </Stack>
    </Container>
  </Page>
</CoachShell>
```

---

## Components

### `Page`

**Purpose**

A minimal page-level layout wrapper that sits inside the shell's semantic
`<main>` element.

**Important:** `Page` renders a `<div>`, **not** a `<main>`. The `<main>`
landmark is owned by the shell (`CoachShell`, `ClientShell`, `AuthLayout`). This
prevents invalid nested `<main>` elements and makes the HTML document outline
predictable.

**When to use it**

- Use `Page` as the outermost wrapper of every route's content.
- Use it when you need a consistent page-level wrapper without owning
  horizontal padding or max-width.

**When not to use it**

- Do not use `Page` to set horizontal padding — use `Container` for that.
- Do not use `Page` as a semantic `<main>` — the shell already provides that.

**Common mistakes**

- Overriding `Page` with lots of layout utilities like `grid`, `overflow-hidden`,
  or `p-2` in a single class name. Those patterns indicate the page has a
  special layout and they should be placed on a dedicated inner container, not
  on `Page`.

**Examples**

```tsx
// Standard dashboard/list page
<Page>
  <Container>
    <PageHeader>...</PageHeader>
    <Stack gap="8">...</Stack>
  </Container>
</Page>
```

```tsx
// Full-bleed form editor that needs its own layout
<Page>
  <Container size="narrow" className="py-8">
    <ExerciseForm />
  </Container>
</Page>
```

---

### `Container`

**Purpose**

Centers content horizontally and applies consistent responsive horizontal
padding.

**Responsibilities**

- Define a maximum width for readable content.
- Apply consistent horizontal padding across breakpoints.

**What it does NOT do**

- It does not set vertical padding or spacing. Vertical rhythm is the
  responsibility of `Page`, `Stack`, or page-specific content.
- It does not handle backgrounds, borders, or layout modes.

**Props**

- `size` (default: `"default"`): controls the max-width.
  - `"narrow"` → `max-w-3xl` — forms, create/edit flows, focused content.
  - `"default"` → `max-w-7xl` — dashboards, list pages.
  - `"wide"` → `max-w-screen-2xl` — analytics, data-heavy screens.
  - `"full"` → no max-width — full-bleed layouts.

**When to use it**

- Wrap page content that should be centered and bounded.
- Use inside `Page` (or inside the shell directly if `Page` is not needed).

**When not to use it**

- Do not use `Container` for sidebars, headers, or full-bleed backgrounds that
  span the entire viewport width.
- Do not use `Container` to apply vertical spacing like `py-8` unless the page
  genuinely needs a top/bottom offset within that bounded width.

**Common mistakes**

- Adding `px-4 sm:px-6 lg:px-8` overrides — `Container` already does this.
- Nesting multiple `Container` components without a clear reason.

**Examples**

```tsx
<Container>
  <Stack gap="8">...</Stack>
</Container>

<Container size="narrow" className="py-8">
  <ClientForm />
</Container>

<Container size="wide">
  <AnalyticsDashboard />
</Container>
```

---

### `Stack`

**Purpose**

A thin wrapper around a one-dimensional flexbox layout. Replaces repetitive
`flex flex-col gap-*` patterns.

**Props**

- `direction` (default: `"column"`): `"column"` or `"row"`.
- `gap` (default: `"6"`): Tailwind gap scale values from `0` to `12`.
- `align` (default: `"stretch"`): cross-axis alignment.
- `justify` (default: `"start"`): main-axis justification.
- `wrap` (default: `false`): enables `flex-wrap`.

**When to use it**

- Use `Stack` when you have a simple vertical or horizontal list of items and
  you want a readable, declarative API.
- Use it for card content, form sections, or dashboard panels.
- Prefer `Stack` when the same gap/alignment pattern repeats 3+ times.

**When not to use it**

- Do not use `Stack` for two-dimensional layouts — use CSS grid or Tailwind's
  `grid` utilities directly.
- Do not use `Stack` when you need complex responsive breakpoints that the
  component does not expose. In those cases, use Tailwind flex utilities
  directly.

**Common mistakes**

- Nesting `Stack` inside another `Stack` without being mindful of total gap.
- Using `Stack` for a single child.
- Using `Stack` where `grid` with `gap` would be semantically clearer.

**Examples**

```tsx
// Vertical card content
<Card>
  <CardHeader>
    <CardTitle>Stats</CardTitle>
  </CardHeader>
  <CardContent>
    <Stack gap="4">
      <StatRow />
      <StatRow />
    </Stack>
  </CardContent>
</Card>

// Horizontal toolbar
<Stack direction="row" gap="3" align="center" justify="between">
  <SearchInput />
  <Button>Filter</Button>
</Stack>

// Centered empty state
<Stack align="center" justify="center" gap="4" className="py-20">
  <EmptyStateIcon />
  <Muted>No clients found</Muted>
</Stack>
```

---

### `PageHeader`, `PageTitleGroup`, `PageTitle`, `PageDescription`, `PageActions`

**Purpose**

A compound family for consistent page-level headers: title, optional
description, and actions.

**Responsibilities**

- `PageHeader`: outer flex container that stacks on mobile and sits side-by-side
  on larger screens.
- `PageTitleGroup`: groups title + description so actions stay aligned to the
  right.
- `PageTitle`: renders the `<h1>`.
- `PageDescription`: renders the secondary text under the title.
- `PageActions`: holds buttons/actions and aligns them right on desktop.

**When to use them**

- Use on every dashboard/list/detail page that has a title and primary actions.

**When not to use them**

- Do not use them for inline card headers — use shadcn `CardHeader` / `CardTitle`
  instead.
- Do not use `PageTitle` for section headers inside a page — use `H2` or `H3`.

**Examples**

```tsx
<PageHeader>
  <PageTitleGroup>
    <PageTitle>Clients</PageTitle>
    <PageDescription>Manage your client roster</PageDescription>
  </PageTitleGroup>
  <PageActions>
    <Button>Add Client</Button>
  </PageActions>
</PageHeader>
```

---

## Decision Guide

| Need | Primitive to use | Example |
|------|------------------|---------|
| Page wrapper inside shell | `Page` | `<Page><Container>...</Container></Page>` |
| Centered, bounded content | `Container` | `<Container size="default">...</Container>` |
| One-dimensional list of items | `Stack` | `<Stack gap="4">...</Stack>` |
| Page title + description + action | `PageHeader` family | See PageHeader example |
| Two-dimensional layout | Tailwind `grid` | `className="grid grid-cols-3 gap-6"` |
| Full-bleed background section | Raw `<section>` | `<section className="bg-muted py-12">` |
| Semantic/global page landmark | Shell `<main>` | Handled by `CoachShell` / `ClientShell` |

---

## Spacing Rules

1. **Horizontal padding only lives in `Container` and shells.** Do not add
   `px-*` directly to `Page`.
2. **Vertical page spacing lives in `Page` children or content sections.** Use
   `Stack` for consistent gaps between sections, or add `py-*` to specific
   sections when they need visual separation.
3. **Avoid magic numbers.** Prefer Tailwind's spacing scale.
4. **When in doubt, use `Stack gap="6"` for page section spacing.**
