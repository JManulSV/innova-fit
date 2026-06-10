import api from "@/lib/api";

export async function getClients() {
    const response = await api.get('/api/clients');
    return response.data;
}