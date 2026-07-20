import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EditClientRequest } from "../types/clients.types";
import { editClient } from "../services/edit-client";

export function useEditClient() {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: { id: string; data: EditClientRequest }) => editClient(data.id, data.data),
        
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });

            queryClient.invalidateQueries({
                queryKey: ["client", variables.id],
            });
        }
    });
}