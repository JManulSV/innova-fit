import { ExerciseElement } from "./Exercise";

export interface AssignedWorkout {
    id:            number;
    name:          string;
    notes:         string;
    assigned_date: Date;
    //client:        Client;
    exercises:     ExerciseElement[];
}