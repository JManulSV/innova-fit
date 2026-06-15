import api from "@/lib/api"

export const getTemplate = async (id: string) => {
    const response = await api.get(`/api/templates/${id}`)
    return response.data;
}