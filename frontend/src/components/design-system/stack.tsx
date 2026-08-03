import { cn } from "@/lib/utils";

export type StackDirection = "row" | "column";
export type StackGap = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "8" | "10" | "12";
export type StackAlignment = "start" | "center" | "end" | "stretch" | "baseline";
export type StackJustify = "start" | "center" | "end" | "between" | "around" | "evenly";

interface StackProps extends React.ComponentProps<"div"> {
  /**
   * Flex direction. Use "row" for horizontal layouts and "column" for vertical.
   * @default "column"
   */
  direction?: StackDirection;
  /**
   * Gap between children, mapped to Tailwind's spacing scale.
   * @default "6"
   */
  gap?: StackGap;
  /**
   * Cross-axis alignment (`items-*`).
   * @default "stretch"
   */
  align?: StackAlignment;
  /**
   * Main-axis justification (`justify-*`).
   * @default "start"
   */
  justify?: StackJustify;
  /**
   * Whether children should wrap onto multiple lines.
   * @default false
   */
  wrap?: boolean;
}

const directionClasses: Record<StackDirection, string> = {
  row: "flex-row",
  column: "flex-col",
};

const gapClasses: Record<StackGap, string> = {
  "0": "gap-0",
  "1": "gap-1",
  "2": "gap-2",
  "3": "gap-3",
  "4": "gap-4",
  "5": "gap-5",
  "6": "gap-6",
  "8": "gap-8",
  "10": "gap-10",
  "12": "gap-12",
};

const alignClasses: Record<StackAlignment, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};

const justifyClasses: Record<StackJustify, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
  around: "justify-around",
  evenly: "justify-evenly",
};

/**
 * Stack — A thin wrapper around flexbox for one-dimensional layouts.
 *
 * Provides a declarative API for direction, gap, alignment, justification, and
 * wrapping. Use it when you would otherwise repeat `flex flex-col gap-*` across
 * multiple components.
 */
export function Stack({
  className,
  direction = "column",
  gap = "6",
  align = "stretch",
  justify = "start",
  wrap = false,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "flex",
        directionClasses[direction],
        gapClasses[gap],
        alignClasses[align],
        justifyClasses[justify],
        wrap && "flex-wrap",
        className
      )}
      {...props}
    />
  );
}
