"use client"
import LogoutButton from '@/components/LogoutButton'
import { useAuthStore } from '@/stores/auth-store'

function ClientDashboard() {
    const {user} = useAuthStore()
  return (
    <div>
      Dashboard Client - {user?.email}
      <LogoutButton />
    </div>
  )
} 

export default ClientDashboard