import { useAuthStore } from '@/src/store/authStore'
import { View, Text } from 'react-native'

export default function Dashboard() {
  const user = useAuthStore((state) => state.user)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        }}>
      <Text>Coach Dashboard</Text>
      <Text>Welcome, {user?.name}</Text>
    </View>
  )
}