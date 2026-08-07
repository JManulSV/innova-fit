"use client";

import { useEffect, useMemo, useReducer, useRef } from "react";
import { Routine, RoutineExercise } from "../../my-routine/types";
import {
  WorkoutSessionExercise,
  WorkoutSessionSet,
  WorkoutSessionState,
} from "../types";

type SetTarget = "performedReps" | "performedWeight";

type WorkoutSessionAction =
  | { type: "initialize"; routine: Routine }
  | { type: "set-current-exercise"; index: number }
  | { type: "previous-exercise" }
  | { type: "next-exercise" }
  | { type: "update-set"; exerciseIndex: number; setIndex: number; target: SetTarget; delta: number }
  | { type: "set-set-value"; exerciseIndex: number; setIndex: number; target: SetTarget; value: number }
  | { type: "complete-set"; exerciseIndex: number; setIndex: number }
  | { type: "add-set"; exerciseIndex: number }
  | { type: "finish-exercise"; exerciseIndex: number }
  | { type: "start-rest"; exerciseIndex: number; setIndex: number; seconds: number }
  | { type: "add-rest-time"; seconds: number }
  | { type: "tick-workout" }
  | { type: "tick-rest" }
  | { type: "skip-rest" }
  | { type: "finish-workout" };

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;

const createSet = (exercise: RoutineExercise, base?: WorkoutSessionSet): WorkoutSessionSet => ({
  id: createId(),
  targetReps: base?.targetReps ?? exercise.reps,
  targetWeight: base?.targetWeight ?? (exercise.weight ?? 0),
  performedReps: base?.performedReps ?? exercise.reps,
  performedWeight: base?.performedWeight ?? (exercise.weight ?? 0),
  status: "pending",
});

const cloneExerciseAsRoutine = (exercise: WorkoutSessionExercise): RoutineExercise => ({
  id: exercise.id,
  assigned_workout_id: exercise.assignedWorkoutExerciseId,
  exercise_id: exercise.id,
  exercise_name: exercise.name,
  sets: exercise.targetSets,
  reps: exercise.targetReps,
  rest_seconds: exercise.restSeconds,
  exercise_order: exercise.order,
  created_at: new Date(),
  updated_at: new Date(),
  weight: exercise.suggestedWeight,
  exercise: {
    id: exercise.id,
    coach_id: 0,
    name: exercise.name,
    description: "",
    instructions: "",
    muscle_groups: [exercise.muscleGroup],
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  },
});

const mapExercise = (exercise: RoutineExercise): WorkoutSessionExercise => ({
  id: exercise.id,
  assignedWorkoutExerciseId: exercise.assigned_workout_id,
  order: exercise.exercise_order,
  name: exercise.exercise_name,
  muscleGroup: exercise.exercise.muscle_groups?.[0] ?? "Sin grupo",
  targetSets: exercise.sets,
  targetReps: exercise.reps,
  suggestedWeight: exercise.weight ?? 0,
  restSeconds: exercise.rest_seconds,
  status: "pending",
  forcedCompleted: false,
  sets: Array.from({ length: exercise.sets }, () => createSet(exercise)),
});

function deriveExerciseStatus(
  exercise: WorkoutSessionExercise,
  index: number,
  currentExerciseIndex: number,
): WorkoutSessionExercise {
  const isCompleted = isExerciseCompleted(exercise);
  const isCurrent = index === currentExerciseIndex;

  return {
    ...exercise,
    status: exercise.forcedCompleted || isCompleted ? "completed" : isCurrent ? "current" : "pending",
    sets: exercise.sets.map((set) => ({
      ...set,
      status: set.status,
    })),
  };
}

const initialState: WorkoutSessionState = {
  phase: "loading",
  exercises: [],
  currentExerciseIndex: 0,
  workoutStartedAt: null,
  elapsedSeconds: 0,
  rest: {
    status: "hidden",
    exerciseIndex: null,
    setIndex: null,
    totalSeconds: 0,
    remainingSeconds: 0,
  },
};

function clampIndex(index: number, length: number) {
  if (length <= 0) {
    return 0;
  }

  return Math.min(Math.max(index, 0), length - 1);
}

function updateExercise(
  exercises: WorkoutSessionExercise[],
  index: number,
  updater: (exercise: WorkoutSessionExercise) => WorkoutSessionExercise,
) {
  return exercises.map((exercise, exerciseIndex) =>
    exerciseIndex === index ? updater(exercise) : exercise,
  );
}

function isExerciseCompleted(exercise: WorkoutSessionExercise) {
  return exercise.sets.length > 0 && exercise.sets.every((set) => set.status === "completed");
}

function reducer(state: WorkoutSessionState, action: WorkoutSessionAction): WorkoutSessionState {
  switch (action.type) {
    case "initialize": {
      const exercises = action.routine.exercises
        .slice()
        .sort((left, right) => left.exercise_order - right.exercise_order)
        .map(mapExercise);

      return {
        ...initialState,
        phase: "active",
        exercises,
        currentExerciseIndex: 0,
        workoutStartedAt: Date.now(),
      };
    }
    case "set-current-exercise": {
      return {
        ...state,
        currentExerciseIndex: clampIndex(action.index, state.exercises.length),
      };
    }
    case "previous-exercise": {
      return {
        ...state,
        currentExerciseIndex: clampIndex(state.currentExerciseIndex - 1, state.exercises.length),
      };
    }
    case "next-exercise": {
      return {
        ...state,
        currentExerciseIndex: clampIndex(state.currentExerciseIndex + 1, state.exercises.length),
      };
    }
    case "update-set": {
      return {
        ...state,
        exercises: updateExercise(state.exercises, action.exerciseIndex, (exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set, setIndex) => {
            if (setIndex !== action.setIndex) {
              return set;
            }

            const nextValue = Math.max(0, set[action.target] + action.delta);

            return {
              ...set,
              [action.target]: nextValue,
              status: "editing",
            };
          }),
        })),
      };
    }
    case "set-set-value": {
      return {
        ...state,
        exercises: updateExercise(state.exercises, action.exerciseIndex, (exercise) => ({
          ...exercise,
          sets: exercise.sets.map((set, setIndex) => {
            if (setIndex !== action.setIndex) {
              return set;
            }

            return {
              ...set,
              [action.target]: Math.max(0, action.value),
              status: "editing",
            };
          }),
        })),
      };
    }
    case "complete-set": {
      const exerciseIndex = action.exerciseIndex;

      return {
        ...state,
        exercises: updateExercise(state.exercises, exerciseIndex, (exercise) => {
          const set = exercise.sets[action.setIndex];

          if (!set || set.status === "completed") {
            return exercise;
          }

          const nextSets = exercise.sets.map((currentSet, setIndex) =>
            setIndex === action.setIndex
              ? {
                  ...currentSet,
                  status: "completed",
                }
              : currentSet,
          );

          return {
            ...exercise,
            forcedCompleted: false,
            sets: nextSets,
          };
        }),
        rest:
          state.exercises[exerciseIndex]?.restSeconds && state.exercises[exerciseIndex].restSeconds > 0
            ? {
                status: "running",
                exerciseIndex,
                setIndex: action.setIndex,
                totalSeconds: state.exercises[exerciseIndex].restSeconds,
                remainingSeconds: state.exercises[exerciseIndex].restSeconds,
              }
            : {
                ...state.rest,
                status: "hidden",
                exerciseIndex,
                setIndex: action.setIndex,
                totalSeconds: 0,
                remainingSeconds: 0,
              },
      };
    }
    case "add-set": {
      return {
        ...state,
        exercises: updateExercise(state.exercises, action.exerciseIndex, (exercise) => {
          const sourceSet = exercise.sets[exercise.sets.length - 1] ?? exercise.sets[0];
          const routineExercise = cloneExerciseAsRoutine(exercise);

          return {
            ...exercise,
            sets: [...exercise.sets, createSet(routineExercise, sourceSet)],
          };
        }),
      };
    }
    case "finish-exercise": {
      return {
        ...state,
        exercises: updateExercise(state.exercises, action.exerciseIndex, (exercise) => ({
          ...exercise,
          forcedCompleted: true,
          status: "completed",
        })),
      };
    }
    case "start-rest": {
      return {
        ...state,
        rest: {
          status: action.seconds > 0 ? "running" : "hidden",
          exerciseIndex: action.exerciseIndex,
          setIndex: action.setIndex,
          totalSeconds: action.seconds,
          remainingSeconds: action.seconds,
        },
      };
    }
    case "add-rest-time": {
      if (state.rest.status !== "running") {
        return state;
      }

      return {
        ...state,
        rest: {
          ...state.rest,
          totalSeconds: state.rest.totalSeconds + action.seconds,
          remainingSeconds: state.rest.remainingSeconds + action.seconds,
        },
      };
    }
    case "tick-workout": {
      if (!state.workoutStartedAt || state.phase !== "active") {
        return state;
      }

      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1,
      };
    }
    case "tick-rest": {
      if (state.rest.status !== "running") {
        return state;
      }

      if (state.rest.remainingSeconds <= 1) {
        return {
          ...state,
          rest: {
            ...state.rest,
            status: "hidden",
            remainingSeconds: 0,
            totalSeconds: 0,
          },
        };
      }

      return {
        ...state,
        rest: {
          ...state.rest,
          remainingSeconds: state.rest.remainingSeconds - 1,
        },
      };
    }
    case "skip-rest": {
      return {
        ...state,
        rest: {
          ...state.rest,
          status: "hidden",
          remainingSeconds: 0,
          totalSeconds: 0,
        },
      };
    }
    case "finish-workout": {
      return {
        ...state,
        phase: "summary_pending",
      };
    }
    default:
      return state;
  }
}

function useWorkoutSession(routine?: Routine) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const initializedRoutineId = useRef<number | null>(null);

  useEffect(() => {
    if (!routine || initializedRoutineId.current === routine.id) {
      return;
    }

    dispatch({ type: "initialize", routine });
    initializedRoutineId.current = routine.id;
  }, [routine]);

  useEffect(() => {
    if (state.phase !== "active" || !state.workoutStartedAt) {
      return;
    }

    const timer = window.setInterval(() => {
      dispatch({ type: "tick-workout" });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [state.phase, state.workoutStartedAt]);

  useEffect(() => {
    if (state.rest.status !== "running") {
      return;
    }

    const timer = window.setInterval(() => {
      dispatch({ type: "tick-rest" });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [state.rest.status]);

  const activeExercise = state.exercises[state.currentExerciseIndex] ?? null;
  const exercises = useMemo(
    () => state.exercises.map((exercise, index) => deriveExerciseStatus(exercise, index, state.currentExerciseIndex)),
    [state.exercises, state.currentExerciseIndex],
  );
  const currentExercise = exercises[state.currentExerciseIndex] ?? null;
  const isCurrentExerciseComplete = currentExercise ? isExerciseCompleted(currentExercise) : false;
  const isLastExercise = state.currentExerciseIndex === state.exercises.length - 1;
  const completedExercisesCount = useMemo(
    () => state.exercises.filter((exercise) => isExerciseCompleted(exercise)).length,
    [state.exercises],
  );
  const progressPercent = state.exercises.length
    ? Math.round((completedExercisesCount / state.exercises.length) * 100)
    : 0;

  const updateSetReps = (exerciseIndex: number, setIndex: number, delta: number) => {
    dispatch({ type: "update-set", exerciseIndex, setIndex, target: "performedReps", delta });
  };

  const updateSetWeight = (exerciseIndex: number, setIndex: number, delta: number) => {
    dispatch({ type: "update-set", exerciseIndex, setIndex, target: "performedWeight", delta });
  };

  const setSetReps = (exerciseIndex: number, setIndex: number, value: number) => {
    dispatch({ type: "set-set-value", exerciseIndex, setIndex, target: "performedReps", value });
  };

  const setSetWeight = (exerciseIndex: number, setIndex: number, value: number) => {
    dispatch({ type: "set-set-value", exerciseIndex, setIndex, target: "performedWeight", value });
  };

  const completeSet = (exerciseIndex: number, setIndex: number) => {
    dispatch({ type: "complete-set", exerciseIndex, setIndex });
  };

  const restartWorkout = () => {
    if (!routine) {
      return;
    }

    dispatch({ type: "initialize", routine });
  };

  const addSet = (exerciseIndex: number) => {
    dispatch({ type: "add-set", exerciseIndex });
  };

  const previousExercise = () => {
    dispatch({ type: "previous-exercise" });
  };

  const nextExercise = () => {
    if (isLastExercise) {
      dispatch({ type: "finish-workout" });
      return;
    }

    dispatch({ type: "next-exercise" });
  };

  const finishExercise = (exerciseIndex: number) => {
    dispatch({ type: "finish-exercise", exerciseIndex });

    if (exerciseIndex >= state.exercises.length - 1) {
      dispatch({ type: "finish-workout" });
      return;
    }

    dispatch({ type: "next-exercise" });
  };

  const selectExercise = (index: number) => {
    dispatch({ type: "set-current-exercise", index });
  };

  const addRestTime = () => {
    dispatch({ type: "add-rest-time", seconds: 15 });
  };

  const skipRest = () => {
    dispatch({ type: "skip-rest" });
  };

  const finishWorkout = () => {
    dispatch({ type: "finish-workout" });
  };

  const restartRest = () => {
    if (state.rest.exerciseIndex === null || state.rest.setIndex === null) {
      return;
    }

    const exercise = state.exercises[state.rest.exerciseIndex];

    dispatch({
      type: "start-rest",
      exerciseIndex: state.rest.exerciseIndex,
      setIndex: state.rest.setIndex,
      seconds: exercise?.restSeconds ?? 0,
    });
  };

  return {
    ...state,
    activeExercise,
    currentExercise,
    completedExercisesCount,
    progressPercent,
    isCurrentExerciseComplete,
    isLastExercise,
    exercises,
    updateSetReps,
    updateSetWeight,
    setSetReps,
    setSetWeight,
    completeSet,
    addSet,
    restartWorkout,
    finishExercise,
    previousExercise,
    nextExercise,
    selectExercise,
    addRestTime,
    skipRest,
    restartRest,
    finishWorkout,
  };
}

export { useWorkoutSession };
