"use client";

import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/features/auth/hooks/use-logout";

export default function LogoutButton() {

  const router = useRouter();

  const clearUser = useAuthStore(
    (state) => state.clearUser
  );

  const logoutMutation = useLogout();

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();

    clearUser();

    router.replace("/login");
  };

  return (
    <button onClick={handleLogout}>
      Cerrar sesión
    </button>
  );
}