import { Text, View } from "react-native";

interface WorkoutProgressProps {
    completedExercises: number;
    totalExercises: number;
}

export default function WorkoutProgress({ completedExercises, totalExercises }: WorkoutProgressProps) {
    const progressPercentage = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
    return (
        <View className="mb-8">
            <View className="flex-row justify-between items-center mb-2">
                <Text className="text-gray-700 mb-2 font-bold text-lg">Progreso</Text>
                <Text className=" font-bold text-lg">{`${completedExercises} de ${totalExercises}`}</Text>
            </View>
            <View className="w-full bg-gray-300 rounded-full h-2">
                <View
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                />
            </View>
        </View>
    );
}