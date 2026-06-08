import { useMutation } from "@tanstack/react-query";
import { login } from "../api/login";
import { LoginRequest, LoginResponse } from "../types/auth.types";
import { useAuthStore } from "@/stores/auth-store";

export function useLogin() {
  const { setAuth } = useAuthStore();
  
  return useMutation({
    mutationFn: (credentials: LoginRequest) => login(credentials),

    onSuccess: (data: LoginResponse) => {
      setAuth(data.data.user, data.data.token);
    },

    onError: (error) => {
      console.log(error);
    },
  });
}