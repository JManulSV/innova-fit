import { Skeleton } from "@/components/ui/skeleton";

const skeletonRows = Array.from({ length: 6 }, (_, index) => index);

export default function ClientsPageSkeleton() {
  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-full rounded-md sm:w-36" />
      </div>

      <div className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <Skeleton className="h-10 w-full rounded-md lg:max-w-sm" />
          <Skeleton className="h-10 w-full rounded-md lg:w-72" />
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="hidden grid-cols-[1.5fr_1fr_1fr_auto_auto] gap-4 border-b border-border bg-background px-4 py-3 md:grid">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="ml-auto h-3 w-12" />
            <span />
          </div>

          <div className="divide-y divide-border md:hidden">
            {skeletonRows.map((row) => (
              <div key={row} className="space-y-4 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
                    <div className="min-w-0 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-44" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-8 rounded-md" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:block">
            {skeletonRows.map((row) => (
              <div
                key={row}
                className="grid grid-cols-[1.5fr_1fr_1fr_auto_auto] items-center gap-4 border-b border-border px-4 py-3 last:border-b-0"
              >
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                  <div className="min-w-0 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-44" />
                  </div>
                </div>
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-32" />
                <Skeleton className="ml-auto h-6 w-16 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
