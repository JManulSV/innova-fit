import { useState } from "react";
import { TemplateExercise, WorkoutTemplateExercise } from "../types/templates.type";
import { Exercise } from "@/features/exercises/types/exercise.types";

export function useTemplateBuilder() {
    const [selectedExercises, setSelectedExercises] = useState<WorkoutTemplateExercise[]>([]);

    const addExercise = (exercise: Exercise) => {
        
        setSelectedExercises(prev => {

            const exist = prev.find((item) => item.exercise_id === exercise.id );

            if (exist) {
                return prev.filter((item) => item.exercise_id !== exercise.id);
            }

            const newExercise: WorkoutTemplateExercise = {
                exercise_id: exercise.id,
                name: exercise.name,
                sets: 4,
                reps: 10,
                rest_seconds: 60,
                exercise_order: prev.length + 1,
            }
            return [...prev, newExercise];
        });
    }

    const deleteExercise = (id: number) => {
        setSelectedExercises((prev) => prev.filter((exercise) => exercise.exercise_id !== id).map((item, index) => {
            return {...item, exercise_order: index + 1}
        }));
    }

    const updateExercise = (id: number, exercise: WorkoutTemplateExercise) => {
        setSelectedExercises((prev) => prev.map((ex) => ex.exercise_id === id ? exercise : ex));
    }

    const getExercise = (id: number) => {
        return selectedExercises.find((exercise) => 
            exercise.exercise_id === id );
    }

    const initializeExercises = (exercise: TemplateExercise[]) => {
        const initializeExercises = exercise.map((item, index) => ({
            exercise_id: item.id,
            name: item.name,
            sets: item.pivot.sets,
            reps: item.pivot.reps,
            rest_seconds: item.pivot.rest_seconds,
            exercise_order: index + 1,
        }));
        
        setSelectedExercises(initializeExercises);
    }
    
    return {
        selectedExercises,
        addExercise,
        deleteExercise,
        updateExercise,
        getExercise,
        initializeExercises
    };
}