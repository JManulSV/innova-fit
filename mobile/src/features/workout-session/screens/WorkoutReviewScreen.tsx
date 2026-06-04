import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useWorkoutSession } from "../hooks/useWorkoutSession";
import { useLocalSearchParams, useRouter } from "expo-router";
import { WorkoutLog } from "../types/WorkouSessionTypes";
import { useState } from "react";


export default function WorkoutReviewScreen() {
    const {id, logs} = useLocalSearchParams();
    const parsedLogs = JSON.parse(logs as string) as WorkoutLog[];
    const { exercises, sendWorkoutLogs } = useWorkoutSession(id as string);
    const router = useRouter();
    const [isSending, setIsSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSendLogs = async () => {
        try {
            const completedExercises = parsedLogs.filter((log) => log.status === "completed")  
            setIsSending(true);
            const response = await sendWorkoutLogs(completedExercises, parseInt(id as string));
            if (response.status === 201) {
                router.push("/(client)/(tabs)/routines");
            }
        } catch (error) {
            console.error("Error sending workout logs:", error);
            setError("Error al enviar los logs de la rutina");
        } finally {
            setIsSending(false);
        }
    };

    return(
    <SafeAreaView>
        <View className="p-4">
            <View className="items-center">
                <Text className="text-orange-600">{"Mision Cumplida!".toLocaleUpperCase()}</Text>
                <Text className="text-3xl font-bold">RUTINA</Text>
                <Text className="text-3xl font-bold text-orange-600">COMPLETA</Text>
                <Text className="text-lg text-gray-500 text-center">Has completado exitosamente tu rutina de entrenamiento.</Text>
            </View>

            <View className="mt-8">
                <Text className="text-orange-600 text-start">Ejercicios completados</Text>
                {exercises.map((exercise) => {
                    const log = parsedLogs.find((log) => log.assigned_workout_exercise_id === exercise.id);
                    return (
                    <View key={exercise.id} className="mt-4 bg-white p-3 rounded-lg flex-row justify-between">
                        <View className="flex-row items-center gap-4">
                            <View className={`h-10 w-10 rounded-full ${log?.status === 'completed' ? 'bg-green-500' : 'bg-red-300'}`}></View>
                            <View className="flex items-start">
                                <Text className="text-gray-700 text-xl font-bold">{exercise.exercise_name}</Text>
                                <Text className="text-sm text-gray-400">{exercise.sets} series x {exercise.reps} repeticiones</Text>
                            </View>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-orange-600 font-bold">{log?.performed_weight || '-'}</Text>
                            <Text className="font-semibold text-gray-400 ml-1">kg</Text>
                        </View>
                    </View>
                    )
                }
                )}
            </View>
            <Pressable className="bg-orange-600 rounded-full p-3 mt-8" onPress={handleSendLogs} disabled={isSending}>
                <Text className="text-white text-center">{isSending ? "Enviando..." : "Guardar Rutina"}</Text>
            </Pressable>
            {error && <Text className="text-red-500 text-center mt-2">{error}</Text>}
        </View>
    </SafeAreaView>
    );
}

