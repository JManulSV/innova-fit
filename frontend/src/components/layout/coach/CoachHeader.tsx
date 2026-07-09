"use client";

import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useAuthStore } from "@/stores/auth-store";

export default function CoachHeader() {

  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <header className="border-b p-4 flex items-center justify-between">
      <span>Hola {user?.name} 👋</span>
      <ThemeToggle />
    </header>
  );
}