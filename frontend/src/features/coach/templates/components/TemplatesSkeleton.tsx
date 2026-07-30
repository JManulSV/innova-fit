"use client";

import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TemplatesSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="border-white/8 bg-[#11151d]">
          <CardHeader className="space-y-4 border-b border-white/5 pb-5">
            <Skeleton className="h-5 w-2/3 bg-white/8" />
            <div className="space-y-2">
              <Skeleton className="h-3 w-full bg-white/8" />
              <Skeleton className="h-3 w-5/6 bg-white/8" />
            </div>
          </CardHeader>
          <CardContent className="space-y-3 pt-5">
            <Skeleton className="h-4 w-full bg-white/8" />
            <Skeleton className="h-4 w-11/12 bg-white/8" />
            <Skeleton className="h-4 w-10/12 bg-white/8" />
          </CardContent>
          <CardFooter className="gap-2 border-t border-white/5 bg-transparent px-5 py-4">
            <Skeleton className="h-8 flex-1 bg-white/8" />
            <Skeleton className="h-8 w-8 bg-white/8" />
            <Skeleton className="h-8 w-8 bg-white/8" />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
