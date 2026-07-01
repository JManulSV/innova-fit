export interface MyRoutineResponse {
    success: boolean;
    data:    Routine[];
    message: string;
}

export interface Routine {
    id:              number;
    name:            string;
    notes:           string;
    assigned_date:   Date;
    start_date:      Date;
    end_date:        Date;
    status:          string;
    computed_status: string;
    client:          Client;
    exercises:       RoutineExercise[];
}

export interface Client {
    id:   number;
    name: string;
}

export interface RoutineExercise {
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
    weight:              null;
    exercise:            RoutineExerciseElement;
}

export interface RoutineExerciseElement {
    id:            number;
    coach_id:      number;
    name:          string;
    description:   string;
    instructions:  string;
    muscle_groups: string[] | null;
    created_at:    Date;
    updated_at:    Date;
    deleted_at:    null;
}