import { useCallback, useState } from "react";
import { TemplateExercise, WorkoutTemplateExercise } from "../types/templates.type";
import { Exercise } from "@/features/coach/exercises/types/exercise.types";

type WorkoutTemplateExercisePatch = Partial<Omit<WorkoutTemplateExercise, "exercise_id">>;

export function useTemplateBuilder() {
    const [selectedExercises, setSelectedExercises] = useState<WorkoutTemplateExercise[]>([]);

    const toggleExercise = useCallback((exercise: Exercise) => {
        setSelectedExercises((prev) => {
            const exists = prev.find((item) => item.exercise_id === exercise.id);

            if (exists) {
                return prev
                    .filter((item) => item.exercise_id !== exercise.id)
                    .map((item, index) => ({ ...item, exercise_order: index + 1 }));
            }

            const newExercise: WorkoutTemplateExercise = {
                exercise_id: exercise.id,
                name: exercise.name,
                muscle_groups: exercise.muscle_groups ?? [],
                sets: 4,
                reps: 10,
                rest_seconds: 60,
                exercise_order: prev.length + 1,
            };

            return [...prev, newExercise];
        });
    }, []);

    const deleteExercise = useCallback((id: number) => {
        setSelectedExercises((prev) => prev.filter((exercise) => exercise.exercise_id !== id).map((item, index) => {
            return {...item, exercise_order: index + 1}
        }));
    }, []);

    const updateExercise = useCallback((id: number, exercise: WorkoutTemplateExercise) => {
        setSelectedExercises((prev) => prev.map((ex) => ex.exercise_id === id ? exercise : ex));
    }, []);

    const updateExerciseFields = useCallback((id: number, patch: WorkoutTemplateExercisePatch) => {
        setSelectedExercises((prev) =>
            prev.map((exercise) =>
                exercise.exercise_id === id
                    ? { ...exercise, ...patch }
                    : exercise
            )
        );
    }, []);

    const getExercise = useCallback(
        (id: number) => selectedExercises.find((exercise) => exercise.exercise_id === id),
        [selectedExercises]
    );

    const initializeExercises = useCallback((exercise: TemplateExercise[]) => {
        const initializeExercises = exercise.map((item, index) => ({
            exercise_id: item.id,
            name: item.name,
            muscle_groups: item.muscle_groups ?? [],
            sets: item.sets,
            reps: item.reps,
            rest_seconds: item.rest_seconds,
            exercise_order: index + 1,
        }));
        
        setSelectedExercises(initializeExercises);
    }, []);

    const resetExercises = useCallback(() => {
        setSelectedExercises([]);
    }, []);
    
    return {
        selectedExercises,
        toggleExercise,
        addExercise: toggleExercise,
        deleteExercise,
        updateExercise,
        updateExerciseFields,
        getExercise,
        initializeExercises,
        resetExercises,
    };
}
