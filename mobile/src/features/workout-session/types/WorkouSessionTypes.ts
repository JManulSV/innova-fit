export interface WorkoutLog {
    assigned_workout_exercise_id: number;
    status: "completed" | "skipped" | "pending";
    performed_weight?: number | null;
}
