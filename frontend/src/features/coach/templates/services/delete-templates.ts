import api from "@/lib/api";

export const deleteTemplate = async (id: string) => {
    const response = await api.delete(`/api/templates/${id}`);
    return response.data;
};
