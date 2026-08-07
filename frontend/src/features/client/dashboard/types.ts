export type Metric = {
  value: string;
  label: string;
  tone: string;
};

export interface DashboardDataResponse {
    current_workout: Workout;
    last_activity:   null;
    week_workouts:   Workout[];
}

export interface Workout {
    id:            number;
    client_id:     number;
    template_id:   number | null;
    name:          string;
    notes:         null | string;
    assigned_date: string;
    created_at:    string;
    updated_at:    string;
    start_date:    string;
    end_date:      string;
    status:        "active" | "completed";
    coach_id:      number;
}

