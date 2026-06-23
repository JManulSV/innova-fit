export interface TemplateRequest {
    name: string;
    description: string;
}

export interface TemplateResponse {
    success: boolean;
    data:    Data;
    message: string;
}

export interface Data {
    current_page:   number;
    data:           Template[];
    first_page_url: string;
    from:           number;
    last_page:      number;
    last_page_url:  string;
    links:          Link[];
    next_page_url:  null;
    path:           string;
    per_page:       number;
    prev_page_url:  null;
    to:             number;
    total:          number;
}

export interface Template {
    id:          number;
    coach_id:    number;
    name:        string;
    description: string;
    exercises?:   TemplateExercise[];
    created_at:  Date;
    updated_at:  Date;
    deleted_at:  null;
}

export interface Link {
    url:    null | string;
    label:  string;
    page:   number | null;
    active: boolean;
}

export interface TemplateExercise {
    id:            number;
    coach_id:      number;
    name:          string;
    description:   string;
    instructions:  string;
    muscle_groups: string[];
    created_at:    Date;
    updated_at:    Date;
    deleted_at:    null;
    pivot:         Pivot;
}

export interface Pivot {
    workout_day_template_id: number;
    exercise_id:             number;
    sets:                    number;
    reps:                    number;
    rest_seconds:            number;
    exercise_order:          number;
    created_at:              Date;
    updated_at:              Date;
}

export interface WorkoutTemplateExercise {
  exercise_id: number;
  name: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  exercise_order: number;
}