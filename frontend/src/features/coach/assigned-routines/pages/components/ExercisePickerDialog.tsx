"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Exercise } from "../../../exercises/types/exercise.types";
import type { RoutineExercise } from "./types";

interface Props {
  open: boolean;
  exercises: Exercise[];
  routineExercises: RoutineExercise[];
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onAddExercises: (exercises: Exercise[]) => void;
}

export default function ExercisePickerDialog({ open, exercises, routineExercises, isLoading, onOpenChange, onAddExercises }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agregar ejercicios</DialogTitle>
        </DialogHeader>

        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Selecciona uno o varios ejercicios para la rutina.</p>
          <div className="grid gap-3 md:grid-cols-2">
            {isLoading ? (
              <div className="col-span-full rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">Cargando ejercicios...</div>
            ) : exercises.length === 0 ? (
              <div className="col-span-full rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">No hay ejercicios disponibles.</div>
            ) : (
              exercises.map((exercise) => {
                const selected = routineExercises.some((item) => item.exercise_id === exercise.id);

                return (
                  <button key={exercise.id} type="button" onClick={() => onAddExercises([exercise])} className={`rounded-2xl border p-4 text-left transition-colors ${selected ? "border-primary bg-primary/5" : "border-border bg-card hover:bg-muted/30"}`}>
                    <p className="font-medium">{exercise.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{(exercise.muscle_groups ?? []).join(" · ") || "Sin grupos musculares"}</p>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
