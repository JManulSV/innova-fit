import { AssignedWorkout } from "@/src/types/AssignedWorkout";
import { Text, View } from "react-native";
import StartWorkoutButton from "./StartWorkoutButton";

interface AssignedWorkoutData {
    data: AssignedWorkout;
}

export default function WorkoutDetailsComponent({ data }: AssignedWorkoutData) {
    return (
        <View className="p-4 bg-white flex gap-4 relative h-full">
            <View className="flex gap-2">
                <Text className="text-lg font-semibold text-gray-500">{new Date(data.assigned_date).toLocaleDateString()}</Text>
                <Text className="text-4xl font-semibold ">Rutina: {data.name}</Text>
            </View>
            <View className="p-4 bg-blue-100 rounded-lg border-blue-300">
                {data.notes && (
                    <Text>Nota del coach: {data.notes}</Text>
                )}
            </View>
            <View>
                {data.exercises.map((exercise) => (
                    <View key={exercise.id} className="p-4 bg-gray-50 rounded-lg mb-6 flex gap-2">
                        <Text className="text-lg font-semibold text-blue-600">Ejercicio {exercise.exercise_order}</Text>
                        <Text className="text-xl font-semibold">{exercise.exercise.name}</Text>
                        <Text className="text-gray-600">{exercise.exercise.description}</Text>
                        <View className="flex-row flex-wrap gap-4 mt-2 mb-4 justify-evenly">
                            <View className="flex gap-2 items-center">
                                <Text className="font-semibold">Series:</Text>
                                <Text>{exercise.sets}</Text>
                            </View>
                            <View className="flex gap-2 items-center">
                                <Text className="font-semibold">Reps:</Text>
                                <Text>{exercise.reps}</Text>
                            </View>
                            <View className="flex gap-2 items-center">
                                <Text className="font-semibold">Peso:</Text>
                                <Text>{exercise.weight ? `${exercise.weight} kg` : '-'} </Text>
                            </View>
                            <View className="flex gap-2 items-center">
                                <Text className="font-semibold">Descanso:</Text>
                                <Text>{exercise.rest_seconds}</Text>
                            </View>
                        </View>
                        <View className="p-4 bg-yellow-100 rounded-lg border-yellow-100">
                            <Text>Tip: {exercise.exercise.instructions}</Text>
                        </View>
                    </View>
                ))}
                <View className="absolute bottom-0 left-0 right-0 ">
                    <StartWorkoutButton id={data.id.toString()} />
                </View>
            </View>
        </View>
    );
}