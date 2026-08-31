"use client";

import { Check, Dumbbell } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

import type { Exercise } from "../../types/exercise.types";

type Props = {
  exercises: Exercise[];
  isLoading: boolean;
  selectedExerciseIds: number[];
  onToggleExercise: (exercise: Exercise) => void;
};

export default function ExerciseSelectorList({ exercises, isLoading, selectedExerciseIds, onToggleExercise }: Props) {
  return (
    <section className="flex min-h-0 flex-1 flex-col space-y-1.5 overflow-hidden">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:text-sm">Lista</h3>
        <span className="text-xs text-muted-foreground lg:text-sm">{exercises.length} ejercicios</span>
      </div>

      <div className="max-h-[24vh] flex-1 space-y-1.5 overflow-y-auto pr-1 lg:max-h-[28vh]">
        {isLoading ? (
          <div className="space-y-3">
            <ExerciseSelectorSkeleton />
            <ExerciseSelectorSkeleton />
            <ExerciseSelectorSkeleton />
          </div>
        ) : exercises.length === 0 ? (
          <div className="flex min-h-28 items-center justify-center rounded-2xl border border-dashed border-border bg-muted/20 px-4 py-5 text-center text-[11px] text-muted-foreground lg:text-sm">
            No hay ejercicios para mostrar.
          </div>
        ) : (
          exercises.map((exercise) => {
            const isSelected = selectedExerciseIds.includes(exercise.id);
            const bodyPartLabel = exercise.body_parts?.[0]?.name?.toUpperCase() ?? "SIN GRUPO";

            return (
              <Card
                key={exercise.id}
                className={cn(
                  "cursor-pointer border transition-colors hover:border-primary/40 hover:bg-muted/20",
                  isSelected && "border-primary/40 bg-primary/5",
                )}
                onClick={() => onToggleExercise(exercise)}
              >
                <CardContent className="flex items-center gap-1.5 px-1.5 py-1.5 lg:gap-1.5 lg:px-2 lg:py-0.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-2xl border border-border bg-muted/30 text-muted-foreground lg:size-8">
                    <Dumbbell className="size-3 lg:size-3" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-1.5 lg:gap-1">
                      <div className="min-w-0">
                        <div className="truncate text-[11px] font-semibold lg:text-[0.8rem]">{exercise.name}</div>
                        <div className="truncate text-[10px] text-muted-foreground lg:text-[0.68rem]">{bodyPartLabel}</div>
                      </div>

                      <Button
                        type="button"
                        size="icon-sm"
                        variant={isSelected ? "default" : "outline"}
                        className="shrink-0 rounded-full lg:size-5"
                        aria-label={isSelected ? "Quitar ejercicio" : "Agregar ejercicio"}
                        aria-pressed={isSelected}
                        onClick={(event) => {
                          event.stopPropagation();
                          onToggleExercise(exercise);
                        }}
                      >
                        {isSelected ? <Check className="size-3.5" /> : <span aria-hidden="true" className="text-[10px] leading-none">+</span>}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </section>
  );
}

function ExerciseSelectorSkeleton() {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2">
      <Skeleton className="size-8 rounded-2xl" />
      <div className="min-w-0 flex-1 space-y-1.5">
        <Skeleton className="h-3.5 w-2/3" />
        <Skeleton className="h-3 w-1/3" />
      </div>
      <Skeleton className="size-6 rounded-full" />
    </div>
  );
}
