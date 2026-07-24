import { useQuery } from "@tanstack/react-query";
import { getExercise } from "../services/get-exercise";

export function useExercise(id: string) {
    return useQuery({
        queryKey: ['exercise', id],
        queryFn: () => getExercise(id),
        select: (response) => response.data,
    })
}