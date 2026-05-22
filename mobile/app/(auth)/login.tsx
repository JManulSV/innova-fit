import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'

import { router } from 'expo-router'

import { api } from '../../src/api/client'
import { useAuthStore } from '../../src/store/authStore'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const setAuth = useAuthStore((state) => state.setAuth)

  async function handleLogin() {
    try {
      const response = await api.post('/login', {
        email,
        password,
      })

      const data = response.data.data

      setAuth(data.user, data.token)

      if (data.user.role === 'coach') {
        router.replace('/(coach)/dashboard')
      } else {
        router.replace('/(client)/home')
      }
    } catch (error) {
      Alert.alert('Error', 'Credenciales incorrectas')
      console.error('Login error:', error)
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
      }}
    >
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{
          borderWidth: 1,
          marginBottom: 16,
          padding: 12,
          borderRadius: 8,
        }}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          marginBottom: 16,
          padding: 12,
          borderRadius: 8,
        }}
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={{
          backgroundColor: 'green',
          padding: 16,
          borderRadius: 8,
        }}
      >
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
          }}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  )
}