import { WorkoutTemplateExercise } from "../templates/types/templates.type";

export interface AssignRoutineRequest {
    template_id?: number;
    client_id: string;
    name: string;
    // description: string;
    notes?: string;
    start_date?: string;
    end_date?: string;
    exercises: WorkoutTemplateExercise[];
}