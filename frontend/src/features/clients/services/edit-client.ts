import { EditClientRequest } from "../types/clients.types";
import api from "@/lib/api";

export const editClient = async (id: string, data: EditClientRequest) => {
    const response = await api.put(`/api/clients/${id}`, data);
    return response.data;
};