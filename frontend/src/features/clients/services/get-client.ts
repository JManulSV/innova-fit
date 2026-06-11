import api from "@/lib/api";

export const getClient = async (id: string) => {
    const response = await api.get(`/api/clients/${id}`);
    return response.data;
};