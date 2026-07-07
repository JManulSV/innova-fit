import { cn } from "@/lib/utils";

type StackProps = React.ComponentProps<"div">;

export function Stack({
  className,
  ...props
}: StackProps) {
  return (
    <div
      className={cn(
        "space-y-12",
        className
      )}
      {...props}
    />
  );
}