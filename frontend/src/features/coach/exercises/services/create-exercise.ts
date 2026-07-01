import api from "@/lib/api";
import { ExerciseCreateRequest } from "../types/exercise.types";

export const createExercise = async (exerciseCreateRequest: ExerciseCreateRequest) => {
    const response = await api.post('/api/exercises', exerciseCreateRequest);
    return response.data;
};