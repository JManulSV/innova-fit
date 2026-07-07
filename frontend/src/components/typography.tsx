import { cn } from "@/lib/utils";

export function H1({ children, className, ...props }: React.ComponentProps<'h1'>) {
  return <h1 className={cn("font-heading text-4xl font-bold tracking-tight", className)} {...props}>{children}</h1>;
}

export function H2({ children, className, ...props }: React.ComponentProps<'h2'>) {
  return <h2 className={cn("font-heading text-3xl font-semibold tracking-tight", className)} {...props}>{children}</h2>;
}

export function Text({ children, className, ...props }: React.ComponentProps<'p'>) {
  return <p className={cn("text-base leading-7", className)} {...props}>{children}</p>;
}

export function Muted({ children, className, ...props }: React.ComponentProps<'p'>) {
  return <p {...props} className={cn("text-sm text-muted-foreground", className)}>
    {children}
  </p>;
}

export function Mono({ children, className, ...props }: React.ComponentProps<'span'>) {
  return <span {...props} className={cn("font-mono text-sm", className)}>
    {children}
  </span>;
}