"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Container } from "@/components/design-system/container";
import { Page } from "@/components/design-system/page";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useMyRoutine } from "../my-routine/hooks/use-get-my-routines";
import WorkoutExerciseTable from "./components/WorkoutExerciseTable";
import WorkoutHeader from "./components/WorkoutHeader";
import WorkoutNavigatorSheet from "./components/WorkoutNavigatorSheet";
import WorkoutRestDialog from "./components/WorkoutRestDialog";
import WorkoutTopBar from "./components/WorkoutTopBar";
import { useWorkoutSession } from "./hooks/use-workout-session";
import { CheckCircle2, Clock3, Repeat2, Target, Layers3 } from "lucide-react";
import type { WorkoutSessionExercise } from "./types";
import type { ElementType } from "react";

interface WorkoutSessionPageProps {
  routineId: string;
}

function formatSummaryTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function getExerciseSummary(exercise: WorkoutSessionExercise) {
  const completedSets = exercise.sets.filter((set) => set.status === "completed").length;
  const totalReps = exercise.sets.reduce((sum, set) => sum + set.performedReps, 0);

  return {
    completedSets,
    totalReps,
    totalWeight: exercise.sets.reduce((sum, set) => sum + set.performedWeight, 0),
  };
}

export default function WorkoutSessionPage({ routineId }: WorkoutSessionPageProps) {
  const { data: routine, isPending, isError } = useMyRoutine(routineId);
  const session = useWorkoutSession(routine);
  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const router = useRouter();

  const isLoading = isPending || session.phase === "loading";
  const currentExercise = session.currentExercise;
  const canGoPrevious = session.currentExerciseIndex > 0;
  const hasPendingExercises = session.exercises.some((exercise) => exercise.status !== "completed");
  const canAdvance = Boolean(currentExercise) && (session.isCurrentExerciseComplete || hasPendingExercises);
  const totalCompletedSets = session.exercises.reduce(
    (sum, exercise) => sum + exercise.sets.filter((set) => set.status === "completed").length,
    0,
  );
  const totalPerformedReps = session.exercises.reduce(
    (sum, exercise) => sum + exercise.sets.reduce((setSum, set) => setSum + set.performedReps, 0),
    0,
  );

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError || !routine || (!currentExercise && session.phase !== "summary_pending")) {
    return <div>No se pudo cargar la rutina.</div>;
  }

  if (!currentExercise && session.phase === "active") {
    return (
      <Page>
        <Container className="py-3 sm:py-4">
          <Card>
            <CardContent className="space-y-3 py-4 text-center">
              <h2 className="text-xl font-semibold">Rutina sin ejercicios</h2>
              <p className="text-sm text-muted-foreground">Puedes cerrar la sesion cuando quieras.</p>
              <Button type="button" className="w-full sm:w-auto" onClick={session.finishWorkout}>
                Terminar sesion
              </Button>
            </CardContent>
          </Card>
        </Container>
      </Page>
    );
  }

  if (session.phase === "summary_pending") {
    return (
      <Page>
        <Container className="py-3 sm:py-4">
          <Card className="border-border/60 bg-card/95 shadow-sm">
            <CardContent className="space-y-4 p-4 sm:p-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="size-7" />
                </div>
                <div className="space-y-1">
                  <h1 className="text-xl font-black tracking-tight sm:text-2xl">Entrenamiento completado</h1>
                  <p className="text-sm text-muted-foreground">Buen trabajo</p>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-3">
                <SummaryMetric icon={Clock3} label="Duracion" value={formatSummaryTime(session.elapsedSeconds)} />
                <SummaryMetric icon={Target} label="Reps totales" value={String(totalPerformedReps)} />
                <SummaryMetric icon={Layers3} label="Series totales" value={String(totalCompletedSets)} />
              </div>

              <div className="space-y-3">
                <h2 className="text-base font-semibold">Resumen por ejercicio</h2>

                <div className="space-y-2.5">
                  {session.exercises.map((exercise) => {
                    const summary = getExerciseSummary(exercise);

                    return (
                        <Card key={exercise.id} className="border-border/60">
                        <CardContent className="space-y-2.5 p-3.5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-sm font-semibold">{exercise.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {exercise.targetReps}x{exercise.suggestedWeight}
                              </p>
                            </div>
                            <Badge variant="secondary">
                              {summary.completedSets}/{exercise.targetSets} series
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {summary.totalReps} reps totales, {summary.totalWeight} kg totales
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Button type="button" variant="outline" className="w-full" onClick={session.restartWorkout}>
                  <Repeat2 className="mr-2 size-4" />
                  Repetir
                </Button>
                <Button type="button" className="w-full" onClick={() => router.push("/client/workout") }>
                  Guardar y salir
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </Page>
    );
  }

  return (
    <Page>
      <Container className="space-y-4 py-3 sm:py-4">
        <div className="divide-y divide-border/70 rounded-none">
          <WorkoutTopBar
            exercises={session.exercises}
            currentExerciseIndex={session.currentExerciseIndex}
            elapsedSeconds={session.elapsedSeconds}
            onOpenNavigator={() => setIsNavigatorOpen(true)}
          />

          <div className="py-4">
            <WorkoutHeader exercise={currentExercise} currentIndex={session.currentExerciseIndex} totalExercises={session.exercises.length} />
          </div>

          <div className="py-4">
            <WorkoutExerciseTable
              exercise={currentExercise}
              exerciseIndex={session.currentExerciseIndex}
              onSetRepsChange={session.updateSetReps}
              onSetWeightChange={session.updateSetWeight}
              onSetRepsInput={session.setSetReps}
              onSetWeightInput={session.setSetWeight}
              onCompleteSet={session.completeSet}
              onAddSet={session.addSet}
            />
          </div>

          <div className="space-y-3 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <Button type="button" variant="outline" onClick={session.previousExercise} disabled={!canGoPrevious}>
                Anterior
              </Button>
              <Button type="button" onClick={session.nextExercise} disabled={!canAdvance}>
                {session.isLastExercise ? "Finalizar rutina" : "Siguiente pendiente"}
              </Button>
            </div>

            {hasPendingExercises && session.isLastExercise ? (
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm text-amber-700 dark:text-amber-300">
                Aun hay series pendientes en esta rutina.
              </div>
            ) : null}
          </div>
        </div>
      </Container>

      <WorkoutRestDialog
        open={session.rest.status === "running"}
        remainingSeconds={session.rest.remainingSeconds}
        onAddTime={session.addRestTime}
        onSkip={session.skipRest}
      />

      <WorkoutNavigatorSheet
        open={isNavigatorOpen}
        exercises={session.exercises}
        currentExerciseIndex={session.currentExerciseIndex}
        onOpenChange={setIsNavigatorOpen}
        onSelectExercise={session.selectExercise}
      />
    </Page>
  );
}

function SummaryMetric({ icon: Icon, label, value }: { icon: ElementType; label: string; value: string }) {
  return (
    <Card className="border-border/60 bg-muted/20">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
          <p className="text-lg font-semibold tabular-nums">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
