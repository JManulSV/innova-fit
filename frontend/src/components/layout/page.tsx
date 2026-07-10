import { cn } from "@/lib/utils";

type PageProps = React.ComponentProps<"main">;

export function Page({
  className,
  ...props
}: PageProps) {
  return (
    <main
      className={cn(
        "min-h-full bg-background py-10",
        className
      )}
      {...props}
    />
  );
}