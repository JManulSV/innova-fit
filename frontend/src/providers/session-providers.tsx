"use client";
import { useMe } from "@/features/auth/hooks/use-me";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

interface SessionProviderProps {
    children: React.ReactNode;
}

export function SessionProvider({ children }: SessionProviderProps) {
    const { data } = useMe();

    const setUser = useAuthStore((state) => state.setUser);

    useEffect(() => {
        if (data?.success) {
            setUser(data.data.user);
        }
    }, [data, setUser]);

    return (
        <div>
            {children}
        </div>
    );
}