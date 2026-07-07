import api from "@/lib/api";
import { LoginFormData } from "../schemas/login.schema";

export async function login(credentials: LoginFormData) {
  const response = await api.post('/api/auth/login', credentials);
  
  return response.data;
}