import api from "@/lib/api";

import type { ClientsFilters } from "../types/clients.types";

export async function getClients(filters: ClientsFilters) {
    const params = filters.search.trim()
        ? { "filter[search]": filters.search.trim() }
        : {};
    const response = await api.get('/api/clients', { params });
    return response.data;
}