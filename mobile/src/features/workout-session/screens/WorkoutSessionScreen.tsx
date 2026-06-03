import { SafeAreaView } from "react-native-safe-area-context";
import WorkoutHeader from "../components/WorkoutHeader";
import { FlatList, Text, View } from "react-native";
import WorkoutProgress from "../components/WorkoutProgress";
import ExerciseCard from "../components/ExcerciseCard";
import { useLocalSearchParams } from "expo-router";
import { useWorkoutSession } from "../hooks/useWorkoutSession";

export default function WorkoutSessionScreen() {
    const { id } = useLocalSearchParams();
    const { workoutSession, exercises, logs, updateExerciseStatus, isLoading, completedExercises, totalExercises, updateWeight, getLog } = useWorkoutSession(id.toString());

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
    console.log(logs);
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
                                performedWeight={log?.performedWeight}

                                onToggleComplete={() => 
                                    updateExerciseStatus(item.id)
                                }
                                
                                onChangeWeight={(weight) => 
                                    updateWeight(item.id, weight)
                                }
                            />
                        )
                    }}
                />
            </View>
        </SafeAreaView>
    )
}