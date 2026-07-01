import api from "@/lib/api"
import { TemplateRequest } from "../types/templates.type"

export const createTemplate = async (templateRequest: TemplateRequest) => {
    const response = await api.post('/api/templates', templateRequest)
    return response.data
}