import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * ClientFormSkeleton - Skeleton placeholder for the client form while loading
 */
export default function ClientFormSkeleton() {
  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      <div className="space-y-3">
        <Skeleton className="h-8 w-48 rounded-md" />
        <Skeleton className="h-4 w-72 rounded-md" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Skeleton className="h-12 rounded-md" />
        <Skeleton className="h-12 rounded-md" />
        <Skeleton className="h-12 rounded-md" />
        <Skeleton className="h-12 rounded-md" />
      </div>

      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-32 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </div>
    </div>
  );
}
