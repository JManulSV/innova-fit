import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteClient } from "../services/delete-client";

export const useDeleteClient = (id: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteClient(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["clients"] });
        }
    });
};
