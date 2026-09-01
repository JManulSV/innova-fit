"use client";

import { useState } from "react";
import { Page } from "@/components/design-system/page";
import { Container } from "@/components/design-system/container";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMyRoutine } from "../my-routine/hooks/use-get-my-routines";
import { useWorkoutSession } from "./hooks/use-workout-session";
import { useSaveWorkoutSession } from "./hooks/use-save-workout-session";
import { WorkoutTopBar } from "./components/WorkoutTopBar";
import { WorkoutNavigatorSheet } from "./components/WorkoutNavigatorSheet";
import { ActiveExerciseCard } from "./components/ActiveExerciseCard";
import { CompletedExerciseCard } from "./components/CompletedExerciseCard";
import { CollapsedExerciseCard } from "./components/CollapsedExerciseCard";
import type { ActiveExerciseForm } from "./types";

interface WorkoutSessionPageProps {
  routineId: string;
}

export default function WorkoutSessionPage({
  routineId,
}: WorkoutSessionPageProps) {
  const { data: routine, isPending, isError } = useMyRoutine(routineId);
  const session = useWorkoutSession(routine);
  const saveWorkout = useSaveWorkoutSession();

  const [isNavigatorOpen, setIsNavigatorOpen] = useState(false);
  const [showFinishDialog, setShowFinishDialog] = useState(false);

  // ---------------------------------------------------------------------------
  // Loading / error states
  // ---------------------------------------------------------------------------

  if (isPending || session.phase === "loading") {
    return (
      <Page>
        <Container>
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            Cargando entrenamiento...
          </div>
        </Container>
      </Page>
    );
  }

  if (isError || !routine) {
    return (
      <Page>
        <Container>
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            No se pudo cargar la rutina.
          </div>
        </Container>
      </Page>
    );
  }

  if (session.exercises.length === 0) {
    return (
      <Page>
        <Container>
          <div className="flex h-48 items-center justify-center text-muted-foreground">
            Esta rutina no tiene ejercicios.
          </div>
        </Container>
      </Page>
    );
  }

  // ---------------------------------------------------------------------------
  // Handlers
  // ---------------------------------------------------------------------------

  function handleComplete(index: number, form: ActiveExerciseForm) {
    session.completeExercise(index, {
      completedSets: form.sets,
      completedReps: form.reps,
      performedWeight: form.weight,
      notes: form.notes.trim() || null,
    });
  }

  function handleFinishPress() {
    const hasPending = session.exercises.some((ex) => ex.log === null);
    if (hasPending) {
      setShowFinishDialog(true);
    } else {
      submitWorkout();
    }
  }

  function submitWorkout() {
    const completedLogs = session.exercises
      .filter((ex) => ex.log !== null)
      .map((ex) => ex.log!);

    saveWorkout.mutate({
      assignedWorkoutId: routine.id,
      logs: completedLogs,
    });
  }

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  const { exercises, currentIndex, elapsedSeconds, completedCount } = session;
  const total = exercises.length;

  return (
    <Page>
      <Container size="narrow">
        <div className="flex min-h-screen flex-col gap-4 pb-24 pt-4">
          {/* Top bar */}
          <WorkoutTopBar
            elapsedSeconds={elapsedSeconds}
            onOpenNavigator={() => setIsNavigatorOpen(true)}
          />

          {/* Progress header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="font-semibold">{routine.name}</p>
              <span className="text-sm text-muted-foreground">
                {completedCount}/{total}
              </span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${session.progressPercent}%` }}
              />
            </div>
          </div>

          {/* Exercise list */}
          <div className="space-y-3">
            {exercises.map((exercise, index) => {
              if (exercise.status === "completed") {
                return (
                  <CompletedExerciseCard
                    key={exercise.assignedWorkoutExerciseId}
                    exercise={exercise}
                    index={index}
                    onEdit={session.editExercise}
                    onClick={session.selectExercise}
                  />
                );
              }

              if (index === currentIndex) {
                return (
                  <ActiveExerciseCard
                    key={exercise.assignedWorkoutExerciseId}
                    exercise={exercise}
                    index={index}
                    total={total}
                    onComplete={handleComplete}
                  />
                );
              }

              return (
                <CollapsedExerciseCard
                  key={exercise.assignedWorkoutExerciseId}
                  exercise={exercise}
                  position={index + 1}
                  onClick={() => session.selectExercise(index)}
                />
              );
            })}
          </div>
        </div>

        {/* Sticky bottom action */}
        <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4">
          <Button
            className="w-full"
            size="lg"
            disabled={saveWorkout.isPending}
            onClick={handleFinishPress}
          >
            {saveWorkout.isPending
              ? "Guardando..."
              : `Finalizar entrenamiento · ${completedCount}/${total}`}
          </Button>
        </div>
      </Container>

      {/* Navigator sheet */}
      <WorkoutNavigatorSheet
        open={isNavigatorOpen}
        exercises={exercises}
        currentIndex={currentIndex}
        onOpenChange={setIsNavigatorOpen}
        onSelectExercise={session.selectExercise}
      />

      {/* Finish with pending exercises dialog */}
      <Dialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Finalizar el entrenamiento?</DialogTitle>
            <DialogDescription>
              Tienes ejercicios sin completar. Solo se guardarán los
              ejercicios que ya completaste.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowFinishDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                setShowFinishDialog(false);
                submitWorkout();
              }}
            >
              Finalizar de todas formas
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Page>
  );
}
