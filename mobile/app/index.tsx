import { Redirect } from 'expo-router'

import { useAuthStore } from '../src/store/authStore'

export default function Index() {
  const user = useAuthStore((state) => state.user)

  if (!user) {
    return <Redirect href="/(auth)/login" />
  }

  if (user.role === 'coach') {
    return <Redirect href="/(coach)/dashboard" />
  }

  return <Redirect href="/(client)/home" />
}