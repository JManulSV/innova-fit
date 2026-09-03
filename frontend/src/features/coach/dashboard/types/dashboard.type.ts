export interface DashboardResponse {
    success: boolean;
    data: Data;
}

export interface Data {
    stats: Stats | null;
    recent: RecentUser[] | null;
}

export interface RecentUser {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    coach_id: number;
    role: string;
}

export interface Stats {
    total_clients: number;
    total_active_workouts: number;
    total_exercises: number;
    total_templates: number;
}
