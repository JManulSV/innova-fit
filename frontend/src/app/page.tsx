"use client";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const user = useAuthStore(
    (state) => state.user
  );
  const isCheckingAuth = useAuthStore(
    (state) => state.isCheckingAuth
  );

  useEffect(() => {
    if (isCheckingAuth) {
      return;
    }

    if (user) {
      router.replace(`/${user.role}/dashboard`);
      return;
    }

    router.replace("/login");
  }, [isCheckingAuth, router, user]);
  
  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className="h-screen w-screen">
      Innova-fit home
      <Button onClick={() => router.push("/login")}>
        Entrar
      </Button>
    </div>
  );
}
