"use client";
import React from "react";
import { Card } from "@/components/ui/card";

export default function ExerciseDetailSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4">
          <div className="h-8 w-3/4 bg-muted rounded-md" />
          <div className="h-6 w-1/3 bg-muted rounded-md" />
          <Card className="p-4 bg-muted/20">
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded-md w-full" />
              <div className="h-4 bg-muted rounded-md w-full" />
              <div className="h-4 bg-muted rounded-md w-5/6" />
            </div>
          </Card>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded-md w-1/2" />
            <div className="h-3 bg-muted rounded-md w-full" />
            <div className="h-3 bg-muted rounded-md w-5/6" />
            <div className="h-3 bg-muted rounded-md w-2/3" />
          </div>
        </div>

        <div className="md:col-span-1 space-y-4">
          <div className="h-6 w-2/3 bg-muted rounded-md" />
          <div className="h-10 bg-muted rounded-md" />
          <div className="h-40 bg-muted rounded-md" />
        </div>
      </div>
    </div>
  );
}
