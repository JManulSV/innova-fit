import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsCardSkeleton() {
  return (
    <Card className="p-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24 rounded-full" />
        <Skeleton className="h-5 w-5 rounded-full" />
      </div>
      <Skeleton className="mt-5 h-10 w-20 rounded-full" />
      <div className="mt-3 h-0.5 rounded-full bg-accent-foreground/40" />
    </Card>
  );
}
