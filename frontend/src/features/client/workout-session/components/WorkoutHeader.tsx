"use client";

import { Badge } from "@/components/ui/badge";
import { WorkoutSessionExercise } from "../types";

interface WorkoutHeaderProps {
  exercise: WorkoutSessionExercise;
  currentIndex: number;
  totalExercises: number;
}

export default function WorkoutHeader({ exercise, currentIndex, totalExercises }: WorkoutHeaderProps) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs text-muted-foreground">
        Ejercicio {currentIndex + 1} - {totalExercises}
      </p>

      <div className="space-y-2">
        <h2 className="text-2xl font-black tracking-tight sm:text-3xl">{exercise.name}</h2>
        <Badge variant="secondary">{exercise.muscleGroup}</Badge>
      </div>
    </div>
  );
}
