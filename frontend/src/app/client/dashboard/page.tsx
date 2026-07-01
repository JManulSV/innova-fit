"use client"
import LogoutButton from '@/components/LogoutButton'
import RoutinesGrid from '@/features/client/my-routine/components/RoutinesGrid'
import { useAuthStore } from '@/stores/auth-store'

function ClientDashboard() {
    const {user} = useAuthStore()
  return (
    <div>
      Dashboard Client - {user?.email}
      <RoutinesGrid />
      <LogoutButton />
    </div>
  )
} 

export default ClientDashboard