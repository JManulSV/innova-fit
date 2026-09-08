import api from "@/lib/api";
import { ExerciseFilters } from "../filters/exercise-filters.schema";

export const getExercises = async (filters: ExerciseFilters) => {
    const params: Record<string, string> = {};

    if (filters.search?.trim()) {
        params["filter[search]"] = filters.search.trim();
    }

    if (filters.body_parts && filters.body_parts !== "all") {
        params["filter[body_parts]"] = filters.body_parts;
    }

    const response = await api.get('/api/exercises', { params });
    return response.data;
};
