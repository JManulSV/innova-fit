import { useQuery } from "@tanstack/react-query";
import { getClient } from "../services/get-client";

export function useClient(id: string) {
    return useQuery({
        queryKey: ["client", id],
        queryFn: () => getClient(id),
        select: (response) => response.data,
    });
}