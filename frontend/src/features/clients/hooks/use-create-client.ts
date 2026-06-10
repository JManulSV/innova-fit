import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../services/create-client";
import { CreateClientRequest } from "../types/clients.types";

export function useCreateClient() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateClientRequest) => createClient(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["clients"],
            });
        },
    });
}
