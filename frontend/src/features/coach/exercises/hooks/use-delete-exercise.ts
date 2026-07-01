import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteExercise } from "../services/delete-exercise";

export function useDeleteExercise() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deleteExercise,
        
        onSuccess: (_, deletedId) => {
            queryClient.invalidateQueries({
                queryKey: ["exercises"],
            });

            queryClient.removeQueries({
                queryKey: ["exercise", deletedId],
            });
        }
    });
}
