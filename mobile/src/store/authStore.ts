import AsyncStorage from '@react-native-async-storage/async-storage'

import { create } from 'zustand'

import { createJSONStorage, persist } from 'zustand/middleware'

type Role = 'coach' | 'client'

interface User {
  id: number
  name: string
  email: string
  role: Role
}

interface AuthStore {
  user: User | null
  token: string | null

  setAuth: (user: User, token: string) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,

      setAuth: (user, token) =>
        set({
          user,
          token,
        }),

      logout: () =>
        set({
          user: null,
          token: null,
        }),
    }),

    {
      name: 'auth-storage',

      storage: createJSONStorage(() => AsyncStorage),
    }
  )
)