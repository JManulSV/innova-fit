import { AssignedWorkout } from "@/src/types/AssignedWorkout";
import { Text, View } from "react-native";

interface WorkoutCardProps {
    workoutData: AssignedWorkout;
}

export default function WorkoutCard({ workoutData }: WorkoutCardProps) {
    return (
        <View style={{
                padding: 16,
                marginBottom: 16,
                backgroundColor: '#fff',
                borderRadius: 8,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
        }}>
            <Text>{workoutData.name}</Text>
            <Text>{workoutData.notes}</Text>
        </View>
    )
}