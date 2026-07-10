"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { useAuthStore } from "@/stores/auth-store";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { Button } from "@/components/ui/button";

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
    <Button
      variant="ghost"
      size="default"
      className="w-full justify-start gap-2 rounded-xl border border-sidebar-border text-destructive hover:bg-destructive/10 hover:text-destructive dark:hover:bg-destructive/20"
      onClick={handleLogout}
    >
      <LogOut className="size-4" />
      <span>Cerrar sesión</span>
    </Button>
  );
}