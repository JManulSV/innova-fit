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