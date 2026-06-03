import { AssignedWorkout } from "@/src/types/AssignedWorkout";
import { Text, View } from "react-native";

interface WorkoutHeaderProps {
    workoutData: AssignedWorkout
}

export default function WorkoutHeader({workoutData}: WorkoutHeaderProps) {
    return (
        <View className="mb-8 flex gap-4">
            <Text className="text-orange-600 font-bold">ENTRENAMIENTO ACTIVO</Text>
            <Text className="text-gray-700">{'Fecha'}</Text>
            <Text className="font-semibold text-4xl">{workoutData.name}</Text>
            <Text className="text-gray-700">Cliente: {'Prueba'}</Text>
            {workoutData.notes && <Text className="bg-orange-800 text-gray-200 p-2 border-l-4 border-orange-600">{workoutData.notes}</Text>}
        </View>
    );
}