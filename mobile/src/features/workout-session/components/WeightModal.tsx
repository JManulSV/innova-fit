import { ExerciseElement } from "@/src/types/Exercise";
import { useState, Dispatch, SetStateAction } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

interface WeightModalProps{
    isVisible: boolean,
    setIsVisible: Dispatch<SetStateAction<boolean>>;
    exercise: ExerciseElement,
    logWeight: string,
    onChangeWeight: (
        weight: string | null
    ) => void
}

const weightList = [20, 40, 60, 80, 100, 120];

export default function WeightModal({isVisible, setIsVisible, exercise, logWeight, onChangeWeight}:WeightModalProps){
    const [weight, setWeight] = useState(Number(logWeight));
    const [weightSelected, setWeightSelected] = useState(0);

    const handleSum = () => {
        setWeight((prev) => Number((prev + 2.5).toFixed(1)));
    };

    const handleRes = () => {
        setWeight((prev) => Number(Math.max(0, prev - 2.5).toFixed(1)));
    };

    const changeWeight = (amount: number) => {
        setWeight((prev) =>
            Number(Math.max(0, prev + amount).toFixed(1))
        );
    };

    const handleSaveWeight = (weight: string) => {
        onChangeWeight(weight)
        setIsVisible((prev) => !prev)
    };

    return(
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
        >
            <Pressable className="flex-1 bg-black/40 justify-end"
            onPress={() => setIsVisible((prev) => !prev)}>
                
            <Pressable className="bg-white p-6" onPress={(e) => e.stopPropagation()}>
                    <Text className="text-orange-600">{'Modificar Peso'.toLocaleUpperCase()}</Text>
                    <Text className=" font-semibold text-4xl mb-8">{exercise.exercise_name}</Text>
                    <View className="flex-row items-center border rounded-lg overflow-hidden mb-6">
                        <Pressable 
                            className="w-16 h-20 items-center justify-center " 
                            onPress={handleRes}
                        >
                            <Text className="text-4xl">-</Text>
                        </Pressable>
                        <TextInput
                            className="flex-1 h-20 text-center text-3xl"
                            value={weight.toString() + 'kg'}
                            keyboardType="numeric"
                            onChangeText={(text) => changeWeight(Number(text) || 0)}
                        />
                        <Pressable 
                            className="w-16 h-20 items-center justify-center " 
                            onPress={handleSum}
                        >
                            <Text className="text-3xl">+</Text>
                        </Pressable>
                    </View>
                    <View className="flex-row gap-2 mb-6">
                        {weightList.map((weightItem, index) => (
                            <Pressable onPress={() => {setWeight(weightItem); setWeightSelected(weightItem)}} key={index} className={`p-2 border rounded ${weightSelected === weightItem ? 'border-orange-500':''}`} >
                                <Text className={`text-sm font-semibold ${weightSelected === weightItem ? 'text-orange-500 font-bold':''}`} >{weightItem} kg</Text>
                            </Pressable>
                        ))}
                    </View>
                    <Pressable className="w-full bg-orange-600 p-3 rounded-xl" onPress={() => handleSaveWeight(weight.toString())}>
                        <Text className="text-white text-xl text-center">{"Guardar Peso".toLocaleUpperCase()}</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}