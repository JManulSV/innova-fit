"use client"

import { useState } from "react";
import { Dumbbell, GripVertical, Pencil, Trash2 } from "lucide-react";

import { Stack } from "@/components/design-system/stack";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Mono, Muted, Text } from "@/components/typography";
import type { WorkoutTemplateExercise } from "@/features/coach/templates/types/templates.type";
import AddExerciseCard from "./AddExerciseCard";

interface TemplateExercisesListProps {
  exercises: WorkoutTemplateExercise[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, exercise: WorkoutTemplateExercise) => void;
  onAddClick?: () => void;
}

export default function TemplateExercisesList({ exercises, onDelete, onUpdate, onAddClick }: TemplateExercisesListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<WorkoutTemplateExercise | null>(null);

  const muscleLabel = (exercise: WorkoutTemplateExercise) => {
    const muscleGroups = exercise.muscle_groups ?? [];
    return muscleGroups.length > 0 ? muscleGroups.join(" · ") : "Músculos no especificados";
  };

  const handleStartEdit = (exercise: WorkoutTemplateExercise) => {
    setEditingId(exercise.exercise_id);
    setDraft(exercise);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const handleSaveEdit = () => {
    if (!draft) return;

    onUpdate(draft.exercise_id, draft);
    setEditingId(null);
    setDraft(null);
  };

  if (!exercises || exercises.length === 0) {
    return (
      <Stack gap="4">
        <AddExerciseCard onClick={onAddClick} />
        <Card className="border-dashed border-border bg-card text-card-foreground">
          <CardContent className="space-y-2 py-6">
            <Text className="text-base font-medium">Esta plantilla todavía no tiene ejercicios</Text>
            <Muted className="block text-sm">Cuando agregues ejercicios en la edición, la secuencia aparecerá aquí con el orden y las métricas por bloque.</Muted>
          </CardContent>
        </Card>
      </Stack>
    );
  }

  return (
    <section>
      <Stack gap="4">
        {exercises.map((exercise, index) => (
          <div key={exercise.exercise_id} className="grid grid-cols-1 items-start gap-3 md:gap-4 lg:grid-cols-[1fr]">
            <Card className="border-border bg-card text-card-foreground hover:shadow-md">
              <CardContent className="px-4 py-3">
                {editingId === exercise.exercise_id && draft ? (
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-10 w-20 shrink-0 items-center gap-2 rounded-xl border border-border bg-muted/30 px-2 text-muted-foreground">
                        <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted hover:text-foreground" aria-label="Arrastrar">
                          <GripVertical className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-semibold leading-none text-foreground/80">{String(index + 1).padStart(2, "0")}</span>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground">
                        <Dumbbell className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Text className="truncate text-sm font-semibold leading-5 text-card-foreground md:text-base">{exercise.name}</Text>
                        <Muted className="block truncate text-xs md:text-sm">{muscleLabel(exercise)}</Muted>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <label className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Sets</span>
                        <Input className="h-8 w-14 border-0 bg-transparent p-0 text-center text-sm shadow-none focus-visible:ring-0" type="number" value={draft.sets} onChange={(e) => setDraft({ ...draft, sets: Number(e.target.value || 0) })} />
                      </label>
                      <label className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Reps</span>
                        <Input className="h-8 w-14 border-0 bg-transparent p-0 text-center text-sm shadow-none focus-visible:ring-0" type="number" value={draft.reps} onChange={(e) => setDraft({ ...draft, reps: Number(e.target.value || 0) })} />
                      </label>
                      <label className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2">
                        <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Rest</span>
                        <Input className="h-8 w-16 border-0 bg-transparent p-0 text-center text-sm shadow-none focus-visible:ring-0" type="number" value={draft.rest_seconds} onChange={(e) => setDraft({ ...draft, rest_seconds: Number(e.target.value || 0) })} />
                      </label>

                      <div className="flex items-center gap-2 pl-1">
                        <Button variant="outline" size="sm" onClick={handleCancelEdit}>Cancelar</Button>
                        <Button size="sm" onClick={handleSaveEdit}>Guardar</Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-4">
                    <div className="flex min-w-0 flex-1 items-start gap-3">
                      <div className="flex h-10 w-20 shrink-0 items-center gap-2 rounded-xl border border-border bg-muted/30 px-2 text-muted-foreground">
                        <button type="button" className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted hover:text-foreground" aria-label="Arrastrar">
                          <GripVertical className="h-4 w-4" />
                        </button>
                        <span className="text-sm font-semibold leading-none text-foreground/80">{String(index + 1).padStart(2, "0")}</span>
                      </div>

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground">
                        <Dumbbell className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <Text className="truncate text-sm font-semibold leading-5 text-card-foreground md:text-base">{exercise.name}</Text>
                        <Muted className="block truncate text-xs md:text-sm">{muscleLabel(exercise)}</Muted>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2">
                        <Mono className="text-sm font-bold leading-none">{exercise.sets}</Mono>
                        <Mono className="text-[11px] uppercase tracking-wider text-muted-foreground">sets</Mono>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2">
                        <Mono className="text-sm font-bold leading-none">{exercise.reps}</Mono>
                        <Mono className="text-[11px] uppercase tracking-wider text-muted-foreground">reps</Mono>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-border bg-muted/20 px-3 py-2">
                        <Mono className="text-sm font-bold leading-none text-primary">{exercise.rest_seconds}s</Mono>
                        <Mono className="text-[11px] uppercase tracking-wider text-muted-foreground">rest</Mono>
                      </div>

                      <div className="flex items-center gap-1 pl-1">
                        <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground" onClick={() => handleStartEdit(exercise)} aria-label="Editar ejercicio">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button type="button" className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-red-500" onClick={() => onDelete(exercise.exercise_id)} aria-label="Eliminar ejercicio">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ))}

        <div>
          <AddExerciseCard onClick={onAddClick} />
        </div>
      </Stack>
    </section>
  );
}
