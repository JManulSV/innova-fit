"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { WorkoutSessionExercise } from "../types";

interface WorkoutNavigatorSheetProps {
  open: boolean;
  exercises: WorkoutSessionExercise[];
  currentExerciseIndex: number;
  onOpenChange: (open: boolean) => void;
  onSelectExercise: (index: number) => void;
}

export default function WorkoutNavigatorSheet({
  open,
  exercises,
  currentExerciseIndex,
  onOpenChange,
  onSelectExercise,
}: WorkoutNavigatorSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[82vh] rounded-t-3xl sm:max-w-none" showCloseButton={false}>
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-xl">Tu rutina</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-4 py-4">
          <div className="space-y-2">
            {exercises.map((exercise, index) => {
              const isCurrent = index === currentExerciseIndex;
              const isCompleted = exercise.status === "completed";
              const completedSets = exercise.sets.filter((set) => set.status === "completed").length;

              return (
                <Button
                  key={exercise.id}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto w-full justify-between border p-4 text-left",
                    isCurrent && "border-primary ring-1 ring-primary/30",
                  )}
                  onClick={() => {
                    onSelectExercise(index);
                    onOpenChange(false);
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={isCompleted ? "default" : "secondary"}>{index + 1}</Badge>
                      <span className="font-medium">{exercise.name}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{exercise.muscleGroup}</p>
                    <p className="text-xs text-muted-foreground">
                      {completedSets}/{exercise.sets.length} series
                    </p>
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground" />
                </Button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
