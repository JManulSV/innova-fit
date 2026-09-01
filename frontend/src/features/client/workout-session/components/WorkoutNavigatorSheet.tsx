"use client";

import { CheckCircle2, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { SessionExercise } from "../types";

interface WorkoutNavigatorSheetProps {
  open: boolean;
  exercises: SessionExercise[];
  currentIndex: number;
  onOpenChange: (open: boolean) => void;
  onSelectExercise: (index: number) => void;
}

export function WorkoutNavigatorSheet({
  open,
  exercises,
  currentIndex,
  onOpenChange,
  onSelectExercise,
}: WorkoutNavigatorSheetProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[82vh] rounded-t-3xl sm:max-w-none"
        showCloseButton={false}
      >
        <SheetHeader className="border-b px-4 py-4">
          <SheetTitle className="text-xl">Tu rutina</SheetTitle>
        </SheetHeader>

        <div className="overflow-y-auto px-4 py-4">
          <div className="space-y-2">
            {exercises.map((exercise, index) => {
              const isCurrent = index === currentIndex;
              const isCompleted = exercise.log !== null;

              return (
                <Button
                  key={exercise.assignedWorkoutExerciseId}
                  type="button"
                  variant="outline"
                  className={cn(
                    "h-auto w-full justify-between border p-4 text-left",
                    isCurrent && "border-primary ring-1 ring-primary/30"
                  )}
                  onClick={() => {
                    onSelectExercise(index);
                    onOpenChange(false);
                  }}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
                    ) : (
                      <Circle
                        className={cn(
                          "h-5 w-5 shrink-0",
                          isCurrent
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                    )}
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {index + 1}. {exercise.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {exercise.targetSets} series · {exercise.targetReps} reps
                        {exercise.suggestedWeight != null
                          ? ` · ${exercise.suggestedWeight} kg`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </Button>
              );
            })}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
