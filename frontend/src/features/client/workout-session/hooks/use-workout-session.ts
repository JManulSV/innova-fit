import { useEffect, useReducer, useRef } from "react";
import type { Routine, RoutineExercise } from "@/features/client/my-routine/types";
import type {
  ExerciseLog,
  ExerciseStatus,
  SessionExercise,
  WorkoutPhase,
  WorkoutSessionState,
} from "../types";

// ---------------------------------------------------------------------------
// Actions
// ---------------------------------------------------------------------------

type CompleteExercisePayload = Omit<ExerciseLog, "assignedWorkoutExerciseId" | "completedAt">;

type WorkoutSessionAction =
  | { type: "initialize"; routine: Routine }
  | { type: "complete-exercise"; index: number; log: CompleteExercisePayload }
  | { type: "edit-exercise"; index: number }
  | { type: "select-exercise"; index: number }
  | { type: "tick" }
  | { type: "finish" };

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mapExercise(ex: RoutineExercise): SessionExercise {
  return {
    assignedWorkoutExerciseId: ex.id,
    name: ex.exercise_name,
    targetSets: ex.sets,
    targetReps: ex.reps,
    suggestedWeight: ex.weight ?? null,
    order: ex.exercise_order,
    status: "pending",
    log: null,
  };
}

function deriveStatus(
  exercise: SessionExercise,
  index: number,
  currentIndex: number
): ExerciseStatus {
  if (exercise.log !== null) return "completed";
  if (index === currentIndex) return "active";
  return "pending";
}

function updateExercises(
  exercises: SessionExercise[],
  index: number,
  updater: (ex: SessionExercise) => SessionExercise
): SessionExercise[] {
  return exercises.map((ex, i) => (i === index ? updater(ex) : ex));
}

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

const INITIAL_STATE: WorkoutSessionState = {
  phase: "loading",
  exercises: [],
  currentIndex: 0,
  startedAt: 0,
  elapsedSeconds: 0,
};

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

function reducer(
  state: WorkoutSessionState,
  action: WorkoutSessionAction
): WorkoutSessionState {
  switch (action.type) {
    case "initialize": {
      const sorted = [...action.routine.exercises].sort(
        (a, b) => a.exercise_order - b.exercise_order
      );
      const exercises = sorted.map(mapExercise);
      return {
        phase: "active",
        exercises,
        currentIndex: 0,
        startedAt: Date.now(),
        elapsedSeconds: 0,
      };
    }

    case "complete-exercise": {
      const exercises = updateExercises(
        state.exercises,
        action.index,
        (ex) => ({
          ...ex,
          log: {
            assignedWorkoutExerciseId: ex.assignedWorkoutExerciseId,
            completedSets: action.log.completedSets,
            completedReps: action.log.completedReps,
            performedWeight: action.log.performedWeight,
            notes: action.log.notes,
            completedAt: "", // se asigna al momento del POST
          },
        })
      );

      // Avanzar al siguiente ejercicio pendiente (sin log)
      const nextIndex = exercises.findIndex((ex) => ex.log === null);
      const currentIndex =
        nextIndex !== -1 ? nextIndex : state.currentIndex;

      return { ...state, exercises, currentIndex };
    }

    case "edit-exercise": {
      const exercises = updateExercises(
        state.exercises,
        action.index,
        (ex) => ({ ...ex, log: null })
      );
      return { ...state, exercises, currentIndex: action.index };
    }

    case "select-exercise": {
      const clamped = Math.max(
        0,
        Math.min(action.index, state.exercises.length - 1)
      );
      return { ...state, currentIndex: clamped };
    }

    case "tick": {
      return { ...state, elapsedSeconds: state.elapsedSeconds + 1 };
    }

    case "finish": {
      return { ...state, phase: "finished" };
    }

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useWorkoutSession(routine: Routine | undefined) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const initializedRoutineId = useRef<number | null>(null);

  // Initialize once per routine
  useEffect(() => {
    if (!routine) return;
    if (initializedRoutineId.current === routine.id) return;
    initializedRoutineId.current = routine.id;
    dispatch({ type: "initialize", routine });
  }, [routine]);

  // Workout timer
  useEffect(() => {
    if (state.phase !== "active" || state.startedAt === 0) return;
    const id = setInterval(() => dispatch({ type: "tick" }), 1000);
    return () => clearInterval(id);
  }, [state.phase, state.startedAt]);

  // ---------------------------------------------------------------------------
  // Derived state
  // ---------------------------------------------------------------------------

  const exercises: SessionExercise[] = state.exercises.map((ex, i) => ({
    ...ex,
    status: deriveStatus(ex, i, state.currentIndex),
  }));

  const currentExercise = exercises[state.currentIndex] ?? null;
  const completedCount = exercises.filter((ex) => ex.log !== null).length;
  const progressPercent =
    exercises.length > 0
      ? Math.round((completedCount / exercises.length) * 100)
      : 0;

  // ---------------------------------------------------------------------------
  // Actions
  // ---------------------------------------------------------------------------

  function completeExercise(index: number, log: CompleteExercisePayload) {
    dispatch({ type: "complete-exercise", index, log });
  }

  function editExercise(index: number) {
    dispatch({ type: "edit-exercise", index });
  }

  function selectExercise(index: number) {
    dispatch({ type: "select-exercise", index });
  }

  function finishWorkout() {
    dispatch({ type: "finish" });
  }

  return {
    // State
    phase: state.phase as WorkoutPhase,
    exercises,
    currentIndex: state.currentIndex,
    elapsedSeconds: state.elapsedSeconds,
    // Derived
    currentExercise,
    completedCount,
    progressPercent,
    // Actions
    completeExercise,
    editExercise,
    selectExercise,
    finishWorkout,
  };
}
