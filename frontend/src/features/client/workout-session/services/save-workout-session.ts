import api from "@/lib/api";
import type { ExerciseLog } from "../types";

interface SaveWorkoutSessionPayload {
  assigned_workout_id: number;
  logs: Array<{
    assigned_workout_exercise_id: number;
    completed_sets: number;
    completed_reps: number;
    performed_weight: number | null;
    notes: string | null;
    completed_at: string;
  }>;
}

interface SaveWorkoutSessionResponse {
  message: string;
}

export async function saveWorkoutSession(
  assignedWorkoutId: number,
  logs: ExerciseLog[]
): Promise<SaveWorkoutSessionResponse> {
  const completedAt = new Date().toISOString();

  const payload: SaveWorkoutSessionPayload = {
    assigned_workout_id: assignedWorkoutId,
    logs: logs.map((log) => ({
      assigned_workout_exercise_id: log.assignedWorkoutExerciseId,
      completed_sets: log.completedSets,
      completed_reps: log.completedReps,
      performed_weight: log.performedWeight,
      notes: log.notes,
      completed_at: completedAt,
    })),
  };

  const response = await api.post<SaveWorkoutSessionResponse>(
    "/api/workout-sessions",
    payload
  );

  return response.data;
}
