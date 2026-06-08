export interface User{
    id: number;
    email: string;
    name: string;
    coach_id: number | null;
    role: Role;
}

export type Role = "client" | "coach";

export interface LoginRequest{
    email: string;
    password: string;
}

export interface LoginResponse{
    success: boolean;
    data: {
        user: User;
        token: string;
        token_type: string;
    };
}

export interface MeResponse{
    success: boolean;
    data: User;
}
