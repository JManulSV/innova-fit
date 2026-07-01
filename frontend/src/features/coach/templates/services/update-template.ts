import api from "@/lib/api";
import { TemplateRequest } from "../types/templates.type";

export const updateTemplate = async (id: string, request:TemplateRequest) => {
    const response = await api.put(`/api/templates/${id}`, request);
    return response.data;
}