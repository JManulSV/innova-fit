import { Pencil, Plus, Trash2, Dumbbell } from "lucide-react";

import { Mono, Muted, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TemplateExercise } from "@/features/coach/templates/types/templates.type";

interface TemplateExerciseSequenceProps {
  exercises: TemplateExercise[];
}

function ExerciseMetrics({ exercise }: { exercise: TemplateExercise }) {
  return (
    <div className="flex items-center gap-2 sm:justify-end">
      <div className="flex items-center gap-2">
        <Card className="flex flex-col items-center justify-center gap-1 rounded-lg border-0 px-3 py-2 text-center shadow-sm transition-all hover:shadow-md">
          <Mono className="text-sm font-bold">{exercise.sets}</Mono>
          <Mono className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">series</Mono>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-1 rounded-lg border-0 px-3 py-2 text-center shadow-sm transition-all hover:shadow-md">
          <Mono className="text-sm font-bold ">{exercise.reps}</Mono>
          <Mono className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">reps</Mono>
        </Card>

        <Card className="flex flex-col items-center justify-center gap-1 rounded-lg border-0 px-3 py-2 text-center shadow-sm transition-all hover:shadow-md">
          <Mono className="text-sm font-bold text-primary">{exercise.rest_seconds}s</Mono>
          <Mono className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">descanso</Mono>
        </Card>
      </div>
    </div>
  );
}

function ExerciseRow({ exercise, index }: { exercise: TemplateExercise; index: number }) {
  return (
    <div className="grid grid-cols-[auto_1fr] items-start gap-3 md:gap-4 ">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-popover text-sm font-semibold text-muted-foreground">
        {String(index + 1).padStart(2, "0")}
      </div>

      <Card className="border-border bg-card py-2 text-card-foreground hover:shadow-md transition-shadow">
        <CardContent className="flex  flex-col gap-4 px-3 md:flex-row md:items-center md:justify-between md:gap-6">
          <div className="hidden md:flex bg-linear-to-br from-primary/20 to-primary/10 items-center justify-center p-3 rounded-2xl">
            <Dumbbell className="text-primary size-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="space-y-2">
              <Text className="truncate text-base font-semibold leading-6 text-card-foreground">
                {exercise.name}
              </Text>
              <div className="flex flex-wrap items-center gap-2">
                {(exercise.muscle_groups?.length ?? 0) > 0 ? (
                  exercise.muscle_groups.map((group) => (
                    <Mono key={group} className="text-muted-foreground text-xs uppercase">{group} ·</Mono>
                  ))
                ) : (
                  <span className="text-xs text-muted-foreground italic">Sin grupo muscular</span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <ExerciseMetrics exercise={exercise} />

            {/* <div className="flex items-center gap-2 self-start md:self-end">
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground" disabled>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Editar ejercicio</span>
              </Button>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground" disabled>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Eliminar ejercicio</span>
              </Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function TemplateExerciseSequence({ exercises }: TemplateExerciseSequenceProps) {
  if (exercises.length === 0) {
    return (
      <Card className="border-dashed border-border bg-card text-card-foreground">
        <CardContent className="space-y-2 py-6">
          <Text className="text-base font-medium">Esta plantilla todavía no tiene ejercicios</Text>
          <Muted className="block text-sm">
            Cuando agregues ejercicios en la edición, la secuencia aparecerá aquí con el orden y las métricas por bloque.
          </Muted>
        </CardContent>
      </Card>
    );
  }

  return (
    <section className="space-y-4">
      <div className="space-y-3">
        {exercises
          .slice()
          .sort((a, b) => a.exercise_order - b.exercise_order)
          .map((exercise, index) => (
            <ExerciseRow key={exercise.id} exercise={exercise} index={index} />
          ))}
      </div>

      {/* <Button
        variant="outline"
        className="h-12 w-full justify-start border-dashed border-border bg-transparent text-muted-foreground"
        disabled
      >
        <Plus className="h-4 w-4" />
        Agregar ejercicio a la secuencia
      </Button> */}
    </section>
  );
}