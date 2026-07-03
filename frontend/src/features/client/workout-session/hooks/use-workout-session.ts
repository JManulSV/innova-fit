import { useState } from "react";
import { RoutineExercise } from "../../my-routine/types";

export interface WorkoutExerciseLog{
    assigned_workout_exercise_id: number,
    id: number
    name: string
    completed_sets: number,
    completed_reps: number,
    performed_weight: number,
    note?: string,
    sets: { finish: boolean }[],
    isComplete: boolean,
}

export function useWorkoutSession() {
    const [exercisesLogs, setExercisesLogs] = useState<WorkoutExerciseLog[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const currentExercise = exercisesLogs[currentIndex];

    const initializeExercises = (exercises: RoutineExercise[], assigned_workout_id: number) => {
        const initializedExercises: WorkoutExerciseLog[] = exercises.map((exercise) => ({
            assigned_workout_exercise_id: assigned_workout_id,
            id: exercise.id,
            name: exercise.exercise_name,
            completed_sets: exercise.sets,
            completed_reps: exercise.reps,
            performed_weight: exercise.weight ? exercise.weight : 0,
            note: '',
            isComplete: false,
            sets: Array.from({length: exercise.sets}, () => ({ finish: false })),
        }));

        setExercisesLogs(initializedExercises);
    }

    const nextExercise = () => {
        if (currentIndex < exercisesLogs.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    }

    const handleFinishSet = (exercise_id: number, set_number: number) => {
        setExercisesLogs((prev) => 
            prev.map((item) => 
                item.id === exercise_id 
                    ? {
                        ...item,
                        sets: item.sets.map((set, index) => 
                            index === set_number 
                                ? { ...set, finish: !set.finish } 
                                : set
                        )
                    } 
                    : item
            )
        )
    }

    return { exercisesLogs, initializeExercises, currentIndex, setCurrentIndex, nextExercise, handleFinishSet, currentExercise };
}