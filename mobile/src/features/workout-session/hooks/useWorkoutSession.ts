import { api } from "@/src/api/client";
import { AssignedWorkout } from "@/src/types/AssignedWorkout";
import { ExerciseElement } from "@/src/types/Exercise";
import { useEffect, useState } from "react";

interface WorkoutLog {
    exerciseId: number;
    status: "completed" | "skipped" | "pending";
    performedWeight?: string | null;
}

export function useWorkoutSession(id: string) {
    const [workoutSession, setWorkoutSession] = useState<AssignedWorkout | null>(null);
    const [exercises, setExercises] = useState<ExerciseElement[]>([]);
    const [logs, setLogs] = useState<WorkoutLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const completedExercises = logs.filter(
        log => log.status === "completed"
    ).length;

    const totalExercises = logs.length;

    useEffect(() => {
        const fetchWorkoutSession = async () => {
            try {
                const response = await api.get(`/assigned-workout/${id}`);
                setWorkoutSession(response.data.data);
                setExercises(response.data.data.exercises);
                
                const createdLog = response.data.data.exercises.map((exercise: ExerciseElement) => ({
                    exerciseId: exercise.id,
                    status: "pending",
                    performedWeight: exercise.weight ? exercise.weight.toString() : null,
                }));
                setLogs(createdLog);
            }
            catch (error) {
                console.error("Error fetching workout session:", error);
            }finally {
                setIsLoading(false);
            }
        };
        fetchWorkoutSession();
    }, [id]);

    const updateExerciseStatus = (exerciseId: number) => {
        setLogs((prev) =>
          prev.map((log) =>
            log.exerciseId === exerciseId
              ? {
                  ...log,
                  status: 
                  log.status === "completed"
                  ? "pending"
                  : "completed",
                }
                : log,
          ),
        );
    };

    const getLog = (exerciseId: number) => {
        return logs.find(
            log => log.exerciseId === exerciseId
        );
    };

    const updateWeight = (exerciseId: number, weight: string|null) => {
        setLogs(prev => 
            prev.map(log => 
                log.exerciseId === exerciseId
                ? {
                    ...log,
                    performedWeight: weight
                }
                : log
            )
        )
    }

    return { workoutSession, exercises, logs, updateExerciseStatus, updateWeight, isLoading, completedExercises, totalExercises, getLog};
}