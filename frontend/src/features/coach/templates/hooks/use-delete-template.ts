import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTemplate } from "../services/delete-templates";

export function useDeleteTemplate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTemplate,
        onSuccess: (_, deleteId) => {
            queryClient.invalidateQueries({
                queryKey: ["templates"],
            });
            
            queryClient.removeQueries({
                queryKey: ["template", deleteId],
            });
        },
    });
}