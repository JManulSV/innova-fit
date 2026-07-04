// features/auth/hooks/use-logout.ts

import { useMutation } from "@tanstack/react-query";
import { logout } from "../services/logout";


export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}