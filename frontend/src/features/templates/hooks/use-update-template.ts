import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTemplate } from "../services/update-template";
import { TemplateRequest } from "../types/templates.type";

export function useUpdateTemplate() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, request }: { id: string; request: TemplateRequest }) =>
            updateTemplate(id, request),
        
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["templates"],
            });

             queryClient.invalidateQueries({
                queryKey: ["template", variables.id],
            });
        }
    })    
}