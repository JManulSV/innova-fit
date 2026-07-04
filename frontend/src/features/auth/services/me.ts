import { MeResponse } from "../types/auth.types";
import api from "@/lib/api";

export async function getMe() {
    const response = await api.get<MeResponse>('/api/auth/me');
    return response.data;
}