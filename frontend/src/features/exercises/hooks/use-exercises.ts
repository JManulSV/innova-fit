import { useQuery } from "@tanstack/react-query";
import { getExercises } from "../services/get-exercises";

export function useExercises() {
    return useQuery({
        queryKey: ["exercises"],
        queryFn: getExercises,
    })
}