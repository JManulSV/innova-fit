export type WorkoutPhase = "loading" | "active" | "finished";

export type ExerciseStatus = "pending" | "active" | "completed";

export interface ExerciseLog {
  assignedWorkoutExerciseId: number;
  completedSets: number;
  completedReps: number;
  performedWeight: number | null;
  notes: string | null;
  completedAt: string;
}

export interface SessionExercise {
  assignedWorkoutExerciseId: number;
  name: string;
  targetSets: number;
  targetReps: number;
  suggestedWeight: number | null;
  order: number;
  status: ExerciseStatus;
  log: ExerciseLog | null;
}

export interface WorkoutSessionState {
  phase: WorkoutPhase;
  exercises: SessionExercise[];
  currentIndex: number;
  startedAt: number;
  elapsedSeconds: number;
}

export interface ActiveExerciseForm {
  sets: number;
  reps: number;
  weight: number | null;
  notes: string;
}
