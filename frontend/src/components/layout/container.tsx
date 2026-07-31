import { cn } from "@/lib/utils";

export type ContainerSize = "narrow" | "default" | "wide" | "full";

const containerSizes: Record<ContainerSize, string> = {
  narrow: "max-w-3xl",
  default: "max-w-7xl",
  wide: "max-w-screen-2xl",
  full: "max-w-none",
};

interface ContainerProps extends Omit<React.ComponentProps<"div">, "className" | "size"> {
  /**
   * Controls the maximum width of the container.
   * @default "default"
   */
  size?: ContainerSize;
  className?: string;
}

/**
 * Container — Centers content horizontally and applies consistent responsive
 * horizontal padding.
 *
 * Responsibility:
 * - Define the readable/centered width boundary for a page section.
 * - Apply consistent horizontal padding across breakpoints.
 *
 * It does NOT control vertical spacing. Use `Page`, `Stack`, or content-level
 * utilities for vertical rhythm.
 */
export function Container({
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        containerSizes[size],
        className
      )}
      {...props}
    />
  );
}
