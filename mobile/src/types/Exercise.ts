export interface Exercise {
    id:            number;
    coach_id:      number;
    name:          string;
    description:   string;
    instructions:  string;
    muscle_groups: string[];
    created_at:    Date;
    updated_at:    Date;
    deleted_at:    null;
}
export interface ExerciseElement {
    id:                  number;
    assigned_workout_id: number;
    exercise_id:         number;
    exercise_name:       string;
    sets:                number;
    reps:                number;
    rest_seconds:        number;
    exercise_order:      number;
    created_at:          Date;
    updated_at:          Date;
    weight:              null | string;
    exercise:            Exercise;
}