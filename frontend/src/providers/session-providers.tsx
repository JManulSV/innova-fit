"use client";
import { useMe } from "@/features/auth/hooks/use-me";
import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

interface SessionProviderProps {
    children: React.ReactNode;
}

export function SessionProvider({
  children,
}: SessionProviderProps) {
    const { data, error } = useMe();

    const setUser = useAuthStore(
        (state) => state.setUser
    );

    const setIsCheckingAuth = useAuthStore(
        (state) => state.setIsCheckingAuth
    );

    useEffect(() => {
        if (data?.success) {
        setUser(data.data.user);
        setIsCheckingAuth(false);
        }
    }, [data, setUser, setIsCheckingAuth]);

    useEffect(() => {
        if (error) {
        setIsCheckingAuth(false);
        }
    }, [error, setIsCheckingAuth]);

    return <>{children}</>;
}