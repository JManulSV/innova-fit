import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutHeader from "../components/WorkoutHeader";
import { FlatList, Pressable, Text, View } from "react-native";
import WorkoutProgress from "../components/WorkoutProgress";
import ExerciseCard from "../components/ExcerciseCard";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useWorkoutSession } from "../hooks/useWorkoutSession";

export default function WorkoutSessionScreen() {
    const { id } = useLocalSearchParams();
    const { workoutSession, exercises, logs, updateExerciseStatus, isLoading, completedExercises, totalExercises, updateWeight, getLog } = useWorkoutSession(id.toString());

    const router = useRouter();

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Cargando sesión de entrenamiento...</Text>
            </SafeAreaView>
        );
    }

    if (!workoutSession) {
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Sesión de entrenamiento no encontrada.</Text>
            </SafeAreaView>
        );
    }

    const handleFinishSession = () => {
        router.push({
            pathname: "/workout-session/[id]/review",
            params: {
                id,
                logs: JSON.stringify(logs),
            },
        });
    };
    return (
        <SafeAreaView>
            <View className="p-4">
                <WorkoutHeader workoutData={workoutSession} />
                <WorkoutProgress completedExercises={completedExercises} totalExercises={totalExercises} />
                <FlatList
                    data={exercises}
                    renderItem={({ item }) => {
                        const exerciseId = item.id;
                        const log = getLog(exerciseId);
                        return(
                            <ExerciseCard 
                                exercise={item}
                                completed={log?.status === "completed"}
                                performedWeight={log?.performed_weight}

                                onToggleComplete={() => 
                                    updateExerciseStatus(item.id)
                                }
                                
                                onChangeWeight={(weight) => 
                                    updateWeight(item.id, weight ?? 0)
                                }
                            />
                        )
                    }}
                />
                <Pressable className="bg-blue-700 p-4 rounded-lg mt-4" onPress={handleFinishSession}>
                    <Text className="text-white text-center">Terminar sesión</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}