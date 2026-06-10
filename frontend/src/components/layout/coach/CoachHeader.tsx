"use client";

import { useAuthStore } from "@/stores/auth-store";

export default function CoachHeader() {

  const user = useAuthStore(
    (state) => state.user
  );

  return (
    <header className="border-b p-4">
      Hola {user?.name} 👋
    </header>
  );
}