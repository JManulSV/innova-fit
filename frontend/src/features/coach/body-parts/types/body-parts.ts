export interface BodyPartResponse {
    success: boolean;
    data:    BodyPart[];
    message: string;
    meta:    Meta;
}

export interface BodyPart {
    id:   number;
    name: string;
    slug: string;
}

export interface Meta {
    current_page: number;
    last_page:    number;
    per_page:     number;
    total:        number;
}
