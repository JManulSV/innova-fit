import { api } from "@/src/api/client";
import WorkoutDetailsComponent from "@/src/components/client-workouts/WorkoutDetail";
import { AssignedWorkout } from "@/src/types/AssignedWorkout";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {  Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WorkoutDetails() {
    
    const {id} = useLocalSearchParams();
    const [workoutDetails, setWorkoutDetails] = useState<AssignedWorkout | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWorkoutDetails() {
            try {
                const res = await api.get(`/assigned-workout/${id}`);
                setWorkoutDetails(res.data.data);
                console.log(res.data.data);
            } catch (error) {
                console.error('Error fetching workout details:', error);
            } finally {
                setLoading(false);
            }
        }
    fetchWorkoutDetails();

    }, [id]);

    if (loading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Cargando detalles del entrenamiento...</Text>
            </SafeAreaView>
        );
    }

    if (!workoutDetails) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>No se encontraron detalles para este entrenamiento</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView>
            <WorkoutDetailsComponent data={workoutDetails} />
        </SafeAreaView>
    )
}