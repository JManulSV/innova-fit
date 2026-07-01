import api from "@/lib/api";
import { ExerciseUpdateRequest } from "../types/exercise.types";

export const editExercise = async (id:string, exercise: ExerciseUpdateRequest) => {
    const response = await api.put(`/api/exercises/${id}`, exercise);
    return response.data;
};