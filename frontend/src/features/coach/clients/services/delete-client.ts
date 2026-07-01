import api from "@/lib/api";

export const deleteClient = async (id: string) => {
    const response = await api.delete(`/api/clients/${id}`);
    return response.data;
};