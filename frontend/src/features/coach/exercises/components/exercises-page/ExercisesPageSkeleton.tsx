import { Skeleton } from "@/components/ui/skeleton";

const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

export default function ExercisesPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-44 rounded-md" />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Skeleton className="h-10 w-full sm:max-w-sm rounded-md" />
          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-10 w-20 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-28 rounded-md" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {skeletonCards.map((card) => (
            <div key={card} className="rounded-3xl border border-border bg-card p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-full space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                  </div>
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>

                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-20 w-full rounded-lg" />

                <div className="grid grid-cols-2 gap-2 border-t border-border pt-3">
                  <Skeleton className="h-9 w-full rounded-md" />
                  <Skeleton className="h-9 w-full rounded-md" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}