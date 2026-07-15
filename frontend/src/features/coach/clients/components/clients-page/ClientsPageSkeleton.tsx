import { Skeleton } from "@/components/ui/skeleton";

const skeletonRows = Array.from({ length: 6 }, (_, index) => index);

export default function ClientsPageSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-28" />
          <Skeleton className="h-4 w-64" />
        </div>
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-64 rounded-md" />
          <Skeleton className="h-10 w-64 rounded-md" />
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
          <div className="grid grid-cols-[1.5fr_1fr_1fr_auto_auto] gap-4 border-b border-border bg-background px-4 py-3">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-28" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="ml-auto h-3 w-12" />
            <span />
          </div>

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
    </>
  );
}