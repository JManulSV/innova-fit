import api from "@/lib/api"

export const getTemplates = async () => {
    const response = await api.get('/api/templates')   
    return response.data
}