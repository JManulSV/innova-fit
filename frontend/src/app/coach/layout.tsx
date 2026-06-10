"use client"

import CoachShell from "@/components/layout/coach/CoachShell";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CoachLayout({children}: {children: React.ReactNode}) {
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

    if (user?.role !== "coach") {
        return null;
    }
    
    return (
        <CoachShell>
            {children}
        </CoachShell>
    );
}