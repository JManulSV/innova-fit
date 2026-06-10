import { useQuery } from "@tanstack/react-query";
import { getClients } from "../services/get-clients";

export function useClients() {
    return useQuery({
        queryKey: ["clients"],
        queryFn: getClients,
    });
}