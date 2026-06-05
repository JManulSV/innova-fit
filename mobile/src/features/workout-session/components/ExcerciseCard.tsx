import { ExerciseElement } from "@/src/types/Exercise";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import WeightModal from "./WeightModal";

interface ExerciseCardProps {
    exercise: ExerciseElement;
    completed: boolean;
    performedWeight?: number | null;
    onToggleComplete: () => void;
    onChangeWeight: (
        weight: number | null
    ) => void;
}

export default function ExerciseCard({ exercise, completed, performedWeight, onToggleComplete, onChangeWeight }: ExerciseCardProps) {
    const [detailsVisible, setDetailsVisible] = useState(false);
    const [weightModalVisible, setWeightModalVisible] = useState(false);

    return (
        <>
        <View className={`bg-white relative rounded-lg p-4 mb-4 shadow ${completed ? 'opacity-50 border-green-500 border-2' : ''}`}>
            <View className="flex-row justify-between items-start mb-4">
                <View className="flex-row items-center gap-6 mb-2">
                    <Pressable className={`h-10 w-10 rounded-full border-2 border-gray-300 items-center justify-center mb-2 ${completed ? 'bg-green-500 border-green-500' : ''}`} onPress={onToggleComplete}></Pressable>
                    <View>
                        <Text className="text-2xl font-bold mb-2">{exercise.exercise_name}</Text>
                        <View className="flex-row gap-4">
                            <Text className="text-sm text-gray-700 mb-1">{exercise.sets} Series</Text>
                            <Text className="text-sm text-gray-700 mb-1">{exercise.reps} Reps</Text>
                        </View>
                    </View>
                </View>
                <Pressable onPress={() => setWeightModalVisible((prev) => !prev)} className={`px-3 flex gap-1 justify-center items-center bg-orange-50 border-2 ${completed ? 'border-green-500 bg-green-100' : 'border-orange-400'}`}>
                    <Text className={`text-xl  ${completed ? 'text-green-500' : 'text-orange-600'}`}>{performedWeight}</Text>
                    <Text className="text-sm text-gray-700">KG</Text>
                </Pressable>
            </View>
            <View>
                <Text className="text-sm text-gray-500 underline" onPress={() => setDetailsVisible(!detailsVisible)}>
                    VER DETALLES
                </Text>
                {detailsVisible && (
                    <View className="flex-row justify-around items-center mt-4 border-t-2 border-gray-200 pt-4">
                        <View className="flex items-center gap-2">
                            <Text className="text-xl font-bold">{exercise.sets}</Text>
                            <Text>Series</Text>
                        </View>
                        <View className="flex items-center gap-2">
                            <Text className="text-xl font-bold">{exercise.reps}</Text>
                            <Text>Reps</Text>
                        </View>
                        <View className="flex items-center gap-2">
                            <Text className="text-xl font-bold text-orange-600">{exercise.rest_seconds}</Text>
                            <Text>Descanso</Text>
                        </View>
                    </View>
                )}
            </View>
                <View className="absolute right-0 bg-orange-400 h-6 w-6 rounded-lg items-center justify-center">
                    <Text className=" font-bold">{exercise.exercise_order}</Text>
                </View>
        </View>       
        {weightModalVisible && (
            <WeightModal 
                exercise={exercise} 
                isVisible={weightModalVisible} 
                setIsVisible={setWeightModalVisible} 
                logWeight={performedWeight ?? null} 
                onChangeWeight={onChangeWeight} 
            />
        )}
        </>
    );
}