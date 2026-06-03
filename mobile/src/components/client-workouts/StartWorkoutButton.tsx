import { useRouter } from "expo-router";
import { TouchableOpacity, View, Text } from "react-native";

interface StartWorkoutButtonProps {
    id: string;
}

export default function StartWorkoutButton({ id }: StartWorkoutButtonProps) {
    const router = useRouter();
    return (
        <View className="bg-blue-500 p-4 rounded-lg  items-center">
            <TouchableOpacity
                onPress={() => {
                    router.push({
                        pathname: "/workout-session/[id]",
                        params: { id },
                    })
                }}
            >
                <Text className="text-white font-semibold">Iniciar entrenamiento</Text>
            </TouchableOpacity>
        </View>
    )
}