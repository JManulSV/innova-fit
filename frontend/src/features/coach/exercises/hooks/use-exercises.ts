import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../services/get-exercises";
import { ExerciseFilters } from "../filters/exercise-filters.schema";

export function useExercises(filters: ExerciseFilters) {
    return useQuery({
        queryKey: ["exercises", filters],
        queryFn: () => getExercises(filters),
        select: (response) => response.data,
    });
}
