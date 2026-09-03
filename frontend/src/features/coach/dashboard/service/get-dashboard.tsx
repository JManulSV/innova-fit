import api from "@/lib/api"
import { DashboardResponse } from "../types/dashboard.type"

export const getDashboard = async (): Promise<DashboardResponse> => {
    const response = await api.get('/api/dashboard');
    return response.data;
}
