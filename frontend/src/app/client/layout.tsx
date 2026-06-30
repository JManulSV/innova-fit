"use client"
import ClientShell from "@/components/layout/client/ClientShell";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ClientLayout({children}: {children: React.ReactNode}) {
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

    if (!user) {
        router.replace("/login");
        return;
    }

    if (user.role !== "client") {
        router.replace("/coach/dashboard");
    }
}, [user, isCheckingAuth, router]);
  
  if (isCheckingAuth) {
        return <div>Cargando...</div>;
  }

  if (!user) {
    return null;
  }
  
  if (user.role !== "client") {
    return null;
  }
  
  console.log("Client Layout", {
        user,
        isCheckingAuth
    });
  
  return(
    <ClientShell>
      {children}
    </ClientShell>
  )
} 