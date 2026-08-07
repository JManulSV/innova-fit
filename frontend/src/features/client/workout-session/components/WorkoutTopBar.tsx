"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Clock3, List } from "lucide-react";
import { WorkoutSessionExercise } from "../types";

interface WorkoutTopBarProps {
  exercises: WorkoutSessionExercise[];
  currentExerciseIndex: number;
  elapsedSeconds: number;
  onOpenNavigator: () => void;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function WorkoutTopBar({
  exercises,
  currentExerciseIndex,
  elapsedSeconds,
  onOpenNavigator,
}: WorkoutTopBarProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3 text-sm font-medium text-muted-foreground">
        <Button type="button" variant="outline" size="icon-sm" onClick={onOpenNavigator}>
          <List />
          <span className="sr-only">Abrir selector de ejercicios</span>
        </Button>

        <div className="flex items-center gap-2">
          <Clock3 className="size-4" />
          <span className="tabular-nums">{formatTime(elapsedSeconds)}</span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        {exercises.map((exercise, index) => {
          const isCurrent = index === currentExerciseIndex;
          const isCompleted = exercise.status === "completed";

          return (
            <span
              key={exercise.id}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-colors",
                isCompleted ? "bg-primary" : isCurrent ? "bg-primary/70" : "bg-muted",
              )}
              aria-label={`Ejercicio ${index + 1}`}
            />
          );
        })}
      </div>
    </div>
  );
}
