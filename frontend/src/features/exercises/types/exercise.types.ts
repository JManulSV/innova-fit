export interface ExerciseResponse {
    success: boolean;
    data:    Data;
    message: string;
}

export interface Data {
    current_page:   number;
    data:           Exercise[];
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

export interface Exercise {
    id:            number;
    coach_id:      number;
    name:          string;
    description:   string;
    instructions:  null | string;
    muscle_groups: string[] | null;
    created_at:    Date;
    updated_at:    Date;
    deleted_at:    null;
}

export interface Link {
    url:    null | string;
    label:  string;
    page:   number | null;
    active: boolean;
}

export interface ExerciseCreateRequest {
    name: string;
    muscle_groups: string[];
    description: string;
    instructions: string;
}

export interface ExerciseUpdateRequest {
    name: string;
    muscle_groups: string[];
    description: string;
    instructions: string;
}

