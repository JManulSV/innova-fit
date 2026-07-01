import { User } from "@/features/coach/auth/types/auth.types";
import { create } from "zustand";

interface AuthStore {
    user: User | null;
    isCheckingAuth: boolean

    setUser: (user: User) => void;
    setIsCheckingAuth: (isCheckingAuth: boolean) => void;

    clearUser: () => void;
}

export const useAuthStore = create<AuthStore>()(
    (set) => ({
      user: null,
      isCheckingAuth: true,

      setUser: (user) => set({ user }),
      setIsCheckingAuth: (isCheckingAuth) => set({ isCheckingAuth }),

      clearUser: () => set({ user: null }),
    })
);
