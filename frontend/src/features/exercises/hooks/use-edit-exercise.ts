import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExerciseUpdateRequest } from "../types/exercise.types";
import { editExercise } from "../services/edit-exercise";

export function useEditExercise() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: { id: string; data: ExerciseUpdateRequest }) => editExercise(data.id, data.data),
        
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["exercises"],
            });

            queryClient.invalidateQueries({
                queryKey: ["exercise", variables.id],
            });
        }
    });
}