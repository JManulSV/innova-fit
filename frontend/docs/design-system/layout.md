# Layout System

The Layout System defines the structural primitives used throughout the Innova-Fit frontend.

These primitives are part of the project's **Design System** and establish a consistent way to build pages without duplicating layout logic or Tailwind utilities.

Every new page should be composed using these primitives before introducing custom layout solutions.

---

# Core Principles

The Layout System exists to provide:

* Consistent spacing across the application.
* Predictable page structure.
* Reusable layout patterns.
* Better readability.
* Easier maintenance.

Before introducing custom spacing or layout utilities, verify whether an existing layout primitive already solves the problem.

---

# Hierarchy

A typical application page should follow this composition.

```tsx
<CoachShell>          {/* or ClientShell / AuthLayout */}
  <Page>
    <Container>
      <PageHeader>
        <PageTitleGroup>
          <PageTitle>Clients</PageTitle>
          <PageDescription>
            Manage your client roster
          </PageDescription>
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

This represents the recommended layout for most routes.

Some pages (authentication flows, onboarding, fullscreen editors, etc.) may intentionally use a different composition when justified.

---

# Components

## `Page`

### Purpose

The root layout primitive for every application page.

`Page` provides a consistent page wrapper without owning semantic landmarks or horizontal spacing.

### Responsibilities

* Represent the root visual wrapper of a page.
* Keep page layouts consistent.
* Delegate spacing responsibilities to other layout primitives.

### Important

`Page` renders a `<div>`, **not** a `<main>`.

The semantic `<main>` landmark belongs to the application shell (`CoachShell`, `ClientShell`, `AuthLayout`) to avoid nested `<main>` elements and maintain a predictable document structure.

### When to use it

* As the outermost wrapper of every page.
* As the root layout primitive inside application shells.

### When not to use it

* Do not use it to add horizontal padding.
* Do not replace the shell's `<main>`.
* Do not use it as a generic wrapper for arbitrary components.

### Common mistakes

* Adding layout-specific utilities directly to `Page`.
* Using `Page` as a replacement for `Container`.
* Turning `Page` into a feature-specific layout.

### Examples

```tsx
<Page>
  <Container>
    <PageHeader />
    <Stack gap="8">...</Stack>
  </Container>
</Page>
```

---

## `Container`

### Purpose

Centers page content horizontally while providing consistent responsive horizontal spacing.

### Responsibilities

* Define maximum content width.
* Standardize horizontal padding.
* Provide a consistent reading width across the application.

### Important

`Container` is responsible for the application's horizontal rhythm.

Changes to `Container` affect every page and should be considered a Design System decision.

### What it does NOT do

* Vertical spacing.
* Backgrounds.
* Borders.
* Page layout.
* Section spacing.

### Props

`size`

* `narrow`
* `default`
* `wide`
* `full`

### When to use it

* Wrap page content.
* Center content.
* Limit content width.

### When not to use it

* Full-bleed sections.
* Sidebars.
* Global backgrounds.

### Common mistakes

* Adding custom `px-*`.
* Nesting multiple `Container` components.

---

## `Stack`

### Purpose

A declarative abstraction over one-dimensional Flexbox layouts.

It replaces repeated `flex flex-col gap-*` patterns while improving readability.

### Philosophy

Use `Stack` when it improves readability.

Do not replace every Flexbox layout with `Stack`.

If Tailwind communicates the layout more clearly, prefer Tailwind.

### Props

* direction
* gap
* align
* justify
* wrap

### When to use it

* Vertical spacing.
* Horizontal toolbars.
* Form sections.
* Repeated layout patterns.

### When not to use it

* Grid layouts.
* Complex responsive Flexbox layouts.
* Single-child wrappers.

### Common mistakes

* Deeply nesting multiple `Stack` components.
* Using `Stack` where CSS Grid is more appropriate.

---

## `PageHeader` Family

Includes:

* `PageHeader`
* `PageTitleGroup`
* `PageTitle`
* `PageDescription`
* `PageActions`

### Purpose

Provides a consistent page header pattern throughout the application.

### Responsibilities

* Display page titles.
* Display descriptions.
* Align page actions.
* Maintain consistent spacing.

### When to use it

Every page with:

* Title
* Description
* Primary actions

### When not to use it

* Card headers.
* Section headings.
* Dialog titles.

For those cases, use the corresponding shadcn/ui primitives.

---

# Choosing the Right Primitive

| You need...                    | Use                 |
| ------------------------------ | ------------------- |
| Root page wrapper              | `Page`              |
| Center page content            | `Container`         |
| Vertical or horizontal spacing | `Stack`             |
| Page title and actions         | `PageHeader` family |
| Two-dimensional layout         | Tailwind `grid`     |
| Full-width section             | Native `<section>`  |
| Semantic page landmark         | Shell (`<main>`)    |

---

# Decision Guide

| Need                     | Primitive          |
| ------------------------ | ------------------ |
| Page wrapper             | `Page`             |
| Centered bounded content | `Container`        |
| One-dimensional layout   | `Stack`            |
| Page title and actions   | `PageHeader`       |
| Two-dimensional layout   | Tailwind Grid      |
| Full-bleed background    | Native `<section>` |

---

# Spacing Rules

1. Horizontal padding belongs to `Container` or application shells.
2. Vertical rhythm belongs to page content, `Stack`, or individual sections.
3. Prefer the Tailwind spacing scale.
4. Avoid arbitrary spacing values.
5. Reuse existing layout primitives before introducing new spacing patterns.

---

# Avoid

Avoid creating new layout primitives unless:

* The pattern appears repeatedly.
* The abstraction improves readability.
* The component remains generic.
* The primitive can be reused across multiple pages.

Feature-specific layouts should remain inside their corresponding feature instead of becoming part of the Design System.

---

# Core Principle

Layout primitives should standardize structure, not restrict flexibility.

When a layout pattern becomes common across the application, promote it into the Design System.

Until then, prefer keeping feature-specific layouts close to the feature that owns them.