export type WorkoutSessionPhase = "loading" | "active" | "summary_pending" | "finished" | "cancelled" | "error";

export type WorkoutExerciseStatus = "pending" | "current" | "completed";

export type WorkoutSetStatus = "pending" | "editing" | "completed";

export type WorkoutRestStatus = "hidden" | "running" | "finished" | "skipped";

export interface WorkoutSessionSet {
  id: string;
  targetReps: number;
  targetWeight: number;
  performedReps: number;
  performedWeight: number;
  status: WorkoutSetStatus;
}

export interface WorkoutSessionExercise {
  id: number;
  assignedWorkoutExerciseId: number;
  order: number;
  name: string;
  muscleGroup: string;
  targetSets: number;
  targetReps: number;
  suggestedWeight: number;
  restSeconds: number;
  status: WorkoutExerciseStatus;
  forcedCompleted: boolean;
  sets: WorkoutSessionSet[];
}

export interface WorkoutSessionRest {
  status: WorkoutRestStatus;
  exerciseIndex: number | null;
  setIndex: number | null;
  totalSeconds: number;
  remainingSeconds: number;
}

export interface WorkoutSessionState {
  phase: WorkoutSessionPhase;
  exercises: WorkoutSessionExercise[];
  currentExerciseIndex: number;
  workoutStartedAt: number | null;
  elapsedSeconds: number;
  rest: WorkoutSessionRest;
}
