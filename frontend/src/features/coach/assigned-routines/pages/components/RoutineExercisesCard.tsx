"use client";

import { useState } from "react";

import { GripVertical, Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Stack } from "@/components/design-system/stack";
import type { RoutineExercise } from "./types";

interface Props {
  routineExercises: RoutineExercise[];
  onOpenExercisePicker: () => void;
  onRemoveExercise: (exerciseId: number) => void;
  onUpdateExercise: (exerciseId: number, field: keyof Pick<RoutineExercise, "sets" | "reps" | "rest_seconds">, value: number) => void;
}

export default function RoutineExercisesCard({ routineExercises, onOpenExercisePicker, onRemoveExercise, onUpdateExercise }: Props) {
  const [editingExercise, setEditingExercise] = useState<RoutineExercise | null>(null);

  const handleStartEdit = (exercise: RoutineExercise) => {
    setEditingExercise({ ...exercise });
  };

  const handleCloseEdit = () => {
    setEditingExercise(null);
  };

  const handleSaveEdit = () => {
    if (!editingExercise) return;

    onUpdateExercise(editingExercise.exercise_id, "sets", editingExercise.sets);
    onUpdateExercise(editingExercise.exercise_id, "reps", editingExercise.reps);
    onUpdateExercise(editingExercise.exercise_id, "rest_seconds", editingExercise.rest_seconds);
    handleCloseEdit();
  };

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>Ejercicios de la rutina</CardTitle>
          <CardDescription>{routineExercises.length} ejercicios</CardDescription>
        </div>

        <Button variant="outline" onClick={onOpenExercisePicker}>
          + Agregar ejercicio
        </Button>
      </CardHeader>

      <CardContent>
        {routineExercises.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border/70 px-6 py-16 text-center text-sm text-muted-foreground">
            Aún no hay ejercicios. Agrega uno o elige una plantilla.
          </div>
        ) : (
          <Stack gap="3">
            {routineExercises.map((exercise, index) => (
              <div key={`${exercise.exercise_id}-${index}`} className="flex items-center gap-3 rounded-2xl border border-border bg-muted/15 p-4">
                <button type="button" aria-label="Arrastrar ejercicio" className="shrink-0 rounded-lg border border-border bg-background/60 p-2 text-muted-foreground">
                  <GripVertical className="size-4" />
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <h3 className="truncate font-semibold">{exercise.name}</h3>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{exercise.sets}x{exercise.reps}</span>
                    <span>{exercise.rest_seconds}s</span>
                    <Badge variant="secondary">{exercise.source === "template" ? "De la plantilla" : "Agregado"}</Badge>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" aria-label="Editar ejercicio" onClick={() => handleStartEdit(exercise)}>
                    <Pencil className="size-4" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Eliminar ejercicio" onClick={() => onRemoveExercise(exercise.exercise_id)}>
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            ))}
          </Stack>
        )}
      </CardContent>

      {editingExercise ? (
        <Dialog open onOpenChange={(open) => (!open ? handleCloseEdit() : null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar ejercicio</DialogTitle>
              <DialogDescription>Ajusta series, repeticiones y descanso.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="rounded-xl border border-border bg-muted/20 px-4 py-3">
                <p className="text-sm font-medium">{editingExercise.name}</p>
                <p className="mt-1 text-sm text-muted-foreground">{editingExercise.source === "template" ? "De la plantilla" : "Agregado"}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <label className="space-y-1 text-sm">
                  <span className="text-muted-foreground">Series</span>
                  <Input type="number" min={1} value={editingExercise.sets} onChange={(event) => setEditingExercise({ ...editingExercise, sets: Number(event.target.value) || 0 })} />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-muted-foreground">Repeticiones</span>
                  <Input type="number" min={1} value={editingExercise.reps} onChange={(event) => setEditingExercise({ ...editingExercise, reps: Number(event.target.value) || 0 })} />
                </label>
                <label className="space-y-1 text-sm">
                  <span className="text-muted-foreground">Descanso (s)</span>
                  <Input type="number" min={0} value={editingExercise.rest_seconds} onChange={(event) => setEditingExercise({ ...editingExercise, rest_seconds: Number(event.target.value) || 0 })} />
                </label>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCloseEdit}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEdit}>Guardar cambios</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      ) : null}
    </Card>
  );
}
