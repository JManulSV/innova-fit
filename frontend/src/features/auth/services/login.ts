import api from "@/lib/api";
import { LoginRequest } from "../types/auth.types";

export async function login(credentials: LoginRequest) {
  const response = await api.post('/api/auth/login', credentials);
  
  return response.data;
}