import { api } from "@/src/api/client";
import { AssignedWorkout } from "@/src/types/AssignedWorkout";
import { ExerciseElement } from "@/src/types/Exercise";
import { useEffect, useState } from "react";
import { WorkoutLog } from "../types/WorkouSessionTypes";

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
                
                const createdLog: WorkoutLog[] = response.data.data.exercises.map((exercise: ExerciseElement) => ({
                    assigned_workout_exercise_id: exercise.id,
                    status: "pending",
                    performed_weight: exercise.weight ? exercise.weight.toString() : null,
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
            log.assigned_workout_exercise_id === exerciseId
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
            log => log.assigned_workout_exercise_id === exerciseId
        );
    };

    const updateWeight = (exerciseId: number, weight: string|null) => {
        setLogs(prev => 
            prev.map(log => 
                log.assigned_workout_exercise_id === exerciseId
                ? {
                    ...log,
                    performed_weight: weight
                }
                : log
            )
        )
    }

    const sendWorkoutLogs = async (logs: WorkoutLog[], workoutId: number) => {
        try {
            const response = await api.post(`/assigned-workouts/${workoutId}/logs`, {
                'completed_exercises': logs
            });
            return response;
        } catch (error) {
            console.error("Error sending workout logs:", error);
            throw error;
        }
    }

    return { workoutSession, exercises, logs, updateExerciseStatus, updateWeight, isLoading, completedExercises, totalExercises, getLog, sendWorkoutLogs};
}