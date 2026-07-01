"use client";
import { Exercise } from '@/features/coach/exercises/types/exercise.types';
import React, { useRef } from 'react'
import { Check, Plus } from 'lucide-react';

import { WorkoutTemplateExercise } from "../types/templates.type";

interface AddExerciseModalProps{
    exercises: Exercise[],
    isLoading: boolean,
    onClose: () => void,
    onAdd: (exercise: Exercise) => void,
    getExercise: (id: number) => WorkoutTemplateExercise | undefined,
}

export default function AddExerciseModal({ exercises, isLoading, onClose, onAdd, getExercise }: AddExerciseModalProps){
  const backdrop = useRef<HTMLDivElement>(null);

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdrop.current) {
      onClose();
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" ref={backdrop} onClick={handleClose}>
      {isLoading ? <p>Cargando...</p> : exercises && exercises.length > 0 ? 
      <div className="bg-white p-6 rounded-lg max-h-96 overflow-y-auto w-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar ejercicio</h2>
        {exercises.map((exercise) => (
          <div key={exercise.id} className="flex items-center justify-between py-2 border-b border-gray-200">
            <p className="text-lg">{exercise.name}</p>
            <button onClick={() => onAdd(exercise)} className="p-1 rounded-full hover:bg-blue-300 bg-blue-500 text-white cursor-pointer">
              { getExercise(exercise.id) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3"  />}
            </button>
          </div>
        ))}
      </div>  : <p>No se encontraron ejercicios :((</p>}
    </div>
  );
};