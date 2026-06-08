"use client"
import { useAuthStore } from '@/stores/auth-store'

function ClientDashboard() {
    const {user} = useAuthStore()
  return (
    <div>Dashboard Client - {user?.email}</div>
  )
} 

export default ClientDashboard