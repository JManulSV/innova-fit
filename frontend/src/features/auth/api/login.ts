import api from "@/lib/axios";
import { LoginRequest, LoginResponse } from "../types/auth.types";

export async function login(credentials: LoginRequest) {
        const response = await api.post<LoginResponse>('/login', credentials);
        return response.data;
}