import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { api } from '@/src/api/client'
import WorkoutCard from '@/src/components/client-workouts/WorkoutCard'
import { AssignedWorkout } from '@/src/types/AssignedWorkout'
import { SafeAreaView } from 'react-native-safe-area-context'



export default function RoutinesScreen() {
  const [routines, setRoutines] = useState<AssignedWorkout[]>([])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRoutines() {
      try {
        const response = await api.get('/my-workouts')

        setRoutines(response.data.data)
      } catch (error) {
        console.error('Error fetching routines:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRoutines()
  }, [])

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Cargando rutinas...</Text>
      </View>
    )
  }

  if (routines.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No tienes rutinas asignadas</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={routines}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <WorkoutCard
            workoutData={item}
          />
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  list: {
    padding: 16,
  },
})