import { useEffect, useState } from 'react'

import { Slot } from 'expo-router'

import { useAuthStore } from '../src/store/authStore'
import { LoadingScreen } from '@/src/components/LoadingScreen'

export default function RootLayout() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    console.log('Root layout render')
    if (useAuthStore.persist.hasHydrated()) {
      console.log('Hydration complete')
      setHydrated(true)
    }

    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      console.log('Hydration complete')
      setHydrated(true)
    })

    return unsubscribe
  }, [])

  if (!hydrated) {
    return <LoadingScreen />
  }

  return <Slot />
}