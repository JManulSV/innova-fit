import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/auth-store";
import { login } from "../services/login";

export function useLogin() {
  const setUser = useAuthStore(
    (state) => state.setUser
  );
  
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      setUser(data.data.user);
    },

    onError: (error) => {
      console.log(error);
    },
  });
}