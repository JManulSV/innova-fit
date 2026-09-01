"use client";

import { useState } from "react";
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
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Cargando entrenamiento...
      </div>
    );
  }

  if (isError || !routine) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        No se pudo cargar la rutina.
      </div>
    );
  }

  if (session.exercises.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Esta rutina no tiene ejercicios.
      </div>
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
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-background px-4 pt-3">
      <div className="mx-auto grid h-full min-h-0 w-full max-w-[430px] grid-rows-[auto,1fr,auto] overflow-hidden">
        {/* Header */}
        <div className="sticky top-0 z-20 space-y-3 border-b border-border/50 bg-background/35 pb-3 shadow-[0_10px_30px_-24px_rgba(0,0,0,0.35)] backdrop-blur-3xl supports-[backdrop-filter]:bg-background/25">
          <WorkoutTopBar
            elapsedSeconds={elapsedSeconds}
            onOpenNavigator={() => setIsNavigatorOpen(true)}
          />

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-3">
              <p className="font-display text-lg font-semibold leading-tight">
                {routine.name}
              </p>
              <span className="font-mono text-xs text-muted-foreground">
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
        </div>

        {/* Exercise list */}
        <div className="min-h-0 overflow-y-auto overscroll-contain py-4 pr-1">
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

        {/* Bottom action */}
        <div className="sticky bottom-0 z-20 border-t border-border/50 bg-background/35 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-[0_-10px_30px_-24px_rgba(0,0,0,0.35)] backdrop-blur-3xl supports-[backdrop-filter]:bg-background/25">
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
      </div>

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
    </div>
  );
}
