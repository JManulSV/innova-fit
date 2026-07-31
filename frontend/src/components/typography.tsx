import { cn } from "@/lib/utils";

/**
 * Heading 1 — Top-level page titles.
 * Rendered as a semantic `<h1>`.
 */
export function H1({ children, className, ...props }: React.ComponentProps<'h1'>) {
  return <h1 className={cn("font-heading text-4xl font-bold tracking-tight", className)} {...props}>{children}</h1>;
}

/**
 * Heading 2 — Page section titles.
 * Rendered as a semantic `<h2>`.
 */
export function H2({ children, className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn("font-heading text-3xl font-semibold tracking-tight", className)} {...props}>{children}</h2>;
}

/**
 * Heading 3 — Card/panel titles or sub-section headings.
 * Rendered as a semantic `<h3>`.
 */
export function H3({ children, className, ...props }: React.ComponentProps<'h3'>) {
  return <h3 className={cn("font-heading text-xl font-semibold tracking-tight", className)} {...props}>{children}</h3>;
}

/**
 * Heading 4 — Small sub-section or list-group headings.
 * Rendered as a semantic `<h4>`.
 */
export function H4({ children, className, ...props }: React.ComponentProps<'h4'>) {
  return <h4 className={cn("font-heading text-base font-semibold", className)} {...props}>{children}</h4>;
}

/**
 * Lead text — Large introductory body text for hero sections or empty states.
 * Rendered as a `<p>`.
 */
export function Lead({ children, className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn("text-lg text-muted-foreground leading-relaxed", className)} {...props}>{children}</p>;
}

/**
 * Body text — Standard paragraphs and descriptions.
 * Rendered as a `<p>`.
 */
export function Text({ children, className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn("text-base leading-7", className)} {...props}>{children}</p>;
}

/**
 * Small text — Secondary body copy, supporting details.
 * Rendered as a `<span>`.
 */
export function Small({ children, className, ...props }: React.ComponentProps<'span'>) {
  return <span className={cn("text-sm leading-6", className)} {...props}>{children}</span>;
}

/**
 * Muted text — Helper text, metadata, hints, and less-important UI copy.
 * Rendered as a `<span>`.
 */
export function Muted({ children, className, ...props }: React.ComponentProps<'span'>) {
  return <span {...props} className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </span>;
}

/**
 * Caption text — Data labels, chart labels, table captions, and very small UI text.
 * Rendered as a `<span>`.
 */
export function Caption({ children, className, ...props }: React.ComponentProps<'span'>) {
  return <span {...props} className={cn("text-xs text-muted-foreground", className)}>
    {children}
  </span>;
}

/**
 * Monospace text — Code snippets, IDs, metric values, or tabular data that benefits
 * from a fixed-width font.
 * Rendered as a `<span>`.
 */
export function Mono({ children, className, ...props }: React.ComponentProps<'span'>) {
  return <span {...props} className={cn("font-mono text-sm", className)}>
    {children}
  </span>;
}
