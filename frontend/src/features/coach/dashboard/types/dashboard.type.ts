export interface DashboardResponse {
    success: string;
    data:    Data;
}

export interface Data {
    stats:  Stats;
    recent: RecentUser[];
}

export interface RecentUser {
    id:                number;
    name:              string;
    email:             string;
    email_verified_at: null;
    created_at:        Date;
    updated_at:        Date;
    coach_id:          number;
    role:              string;
}

export interface Stats {
    total_clients:         number;
    total_active_workouts: number;
    total_exercises:       number;
    total_templates:       number;
}
