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
    body_parts:    BodyPart[];
    created_at:    Date;
    updated_at:    Date;
    deleted_at:    null;
}

export interface BodyPart {
    id:   number;
    name: string;
    slug: string;
}

export interface Link {
    url:    null | string;
    label:  string;
    page:   number | null;
    active: boolean;
}

export interface ExerciseCreateRequest {
    name: string;
    body_parts_ids: number[]|null;
    description: string|null;
    instructions: string|null;
}

export interface ExerciseUpdateRequest {
    name: string;
    body_parts_ids: number[]|null;
    description: string|null;
    instructions: string|null;
}

