import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QuickActionSkeleton() {
  return (
    <Card className="flex items-center gap-4 p-6">
      <Skeleton className="h-5 w-5 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32 rounded-full" />
      </div>
    </Card>
  );
}
