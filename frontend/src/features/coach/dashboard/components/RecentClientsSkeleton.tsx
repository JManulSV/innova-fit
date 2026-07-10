import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function RecentClientsSkeleton() {
  return (
    <Card className="overflow-hidden p-0 gap-0">
      {Array.from({ length: 4 }, (_, index) => (
        <div
          key={index}
          className="flex items-center justify-between border-b border-border px-5 py-3 last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32 rounded-full" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-16 rounded-full" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </div>
        </div>
      ))}
    </Card>
  );
}

export default RecentClientsSkeleton;
