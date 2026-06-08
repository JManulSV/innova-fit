import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { login } from "../services/login";

export function useLogin() {
  const { setUser } = useAuthStore();
  
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setUser(data.user);
    },

    onError: (error) => {
      console.log(error);
    },
  });
}