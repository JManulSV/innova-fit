"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuthStore } from "@/stores/auth-store";
import { SidebarTrigger } from "@/components/ui/sidebar";

export default function CoachHeader() {

  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <header className="border-b p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="cursor-pointer" />
        <span>Hola {user?.name} 👋</span>
      </div>
      <ThemeToggle />
    </header>
  );
}