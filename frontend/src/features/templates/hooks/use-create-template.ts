import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTemplate } from "../services/create-templates";

export function useCreateTemplate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createTemplate,
        onSuccess: () => 
            queryClient.invalidateQueries({
                queryKey: ["templates"]
            })
    })
}