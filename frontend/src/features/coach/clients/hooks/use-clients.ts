import { useQuery } from "@tanstack/react-query";
import { getClients } from "../services/get-clients";

import type { ClientsFilters } from "../types/clients.types";

export function useClients(filters: ClientsFilters) {
    return useQuery({
        queryKey: ["clients", filters],
        queryFn: () => getClients(filters),
        placeholderData: (previousData) => previousData,
    });
}