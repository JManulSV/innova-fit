import api from "@/lib/api";

import type { ClientsFilters } from "../types/clients.types";

export async function getClients(filters: ClientsFilters) {
    const response = await api.get('/api/clients', { params: filters });
    return response.data;
}