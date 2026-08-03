import { cn } from "@/lib/utils";

/**
 * Page — Layout primitive for page-level content.
 *
 * IMPORTANT: This component intentionally renders a `<div>`, NOT a `<main>`.
 * The semantic `<main>` landmark is owned by the shell (CoachShell, ClientShell).
 * This avoids invalid nested `<main>` elements while still providing a
 * consistent page-level layout wrapper.
 *
 * Responsibility:
 * - Provide a consistent, minimal wrapper for page content.
 * - Allow vertical spacing to be controlled by children, not by default padding.
 *
 * It does NOT set max-width, horizontal padding, or background color — those
 * are handled by `Container` and the shell.
 */
export function Page({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("min-h-full", className)} {...props} />;
}

/**
 * PageHeader — Consistent page-level header with title, optional description,
 * and action buttons.
 */
export function PageHeader({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
      {...props}
    />
  );
}

/**
 * PageTitleGroup — Groups the title and description together so the header can
 * keep actions aligned on the right without awkward gaps.
 */
export function PageTitleGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-1", className)} {...props} />;
}

/**
 * PageTitle — Page-level heading. Renders `<h1>`.
 */
export function PageTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-heading text-3xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  );
}

/**
 * PageDescription — Secondary description under the page title.
 */
export function PageDescription({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-base text-muted-foreground", className)}
      {...props}
    />
  );
}

/**
 * PageActions — Action button(s) for the page header. Automatically aligns
 * to the right on larger screens.
 */
export function PageActions({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-wrap items-center gap-2 sm:justify-end",
        className
      )}
      {...props}
    />
  );
}
