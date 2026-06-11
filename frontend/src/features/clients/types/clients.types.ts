export interface ClientsResponse {
    success:    boolean;
    data:       Client[];
    pagination: Pagination;
    message:    string;
}

export interface Client {
    id:         number;
    name:       string;
    email:      string;
    created_at: Date;
}

export interface Pagination {
    current_page: number;
    last_page:    number;
    per_page:     number;
    total:        number;
}

export interface CreateClientRequest {
    name: string;
    email: string;
    password: string;
}

export interface CreateClientResponse {
    success: boolean;
    data: Client;
    message: string;
}

export interface EditClientRequest {
    name?: string;
    email?: string;
    password?: string;
}

export interface EditClientResponse {
    success: boolean;
    data: Client;
    message: string;
}
