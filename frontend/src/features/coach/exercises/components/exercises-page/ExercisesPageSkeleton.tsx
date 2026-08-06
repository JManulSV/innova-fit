import { Skeleton } from "@/components/ui/skeleton";

const skeletonCards = Array.from({ length: 6 }, (_, index) => index);

export default function ExercisesPageSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-4 w-80" />
        </div>
        <Skeleton className="h-10 w-full rounded-md sm:w-44" />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-10 w-full rounded-md lg:max-w-sm" />
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap">
            <Skeleton className="h-10 w-full rounded-md sm:w-20" />
            <Skeleton className="h-10 w-full rounded-md sm:w-24" />
            <Skeleton className="h-10 w-full rounded-md sm:w-24" />
            <Skeleton className="h-10 w-full rounded-md sm:w-28" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
