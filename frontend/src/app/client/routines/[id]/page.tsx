"use client";

import { useMyRoutine } from "@/features/client/my-routine/hooks/use-get-my-routines";
import { Routine, RoutineExercise } from "@/features/client/my-routine/types";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

function RoutinesPage() {
  const { id } = useParams();
  const { data:routine, isPending } = useMyRoutine(id as string);
  const router = useRouter();

  if (isPending) {
    return <div>Cargando...</div>;
  }

  if (!routine && !isPending) {
    return <div>No se encontró la rutina</div>;
  }
  
  return (
    <>
    <div className="py-4">
      <h2 className="text-2xl font-semibold">{routine?.name}</h2>
      <p className="text-gray-600">{routine?.notes}</p>
    </div>
    <div>
      <h3 className="text-xl font-semibold pb-4">Ejercicios <span className="text-gray-600">({routine?.exercises.length})</span></h3>
      <div className="flex flex-col gap-3 rounded-2xl">
          {routine?.exercises.map((exercise: RoutineExercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
      </div>
    </div>
    <button className="mt-8 bg-blue-900 text-white text-center font-semibold p-4 rounded w-full cursor-pointer" onClick={() => router.push(`/client/workout-session/${routine.id}`)}>Iniciar Rutina</button>
    </>
  )
}

export default RoutinesPage;

export function ExerciseCard({ exercise }: { exercise: RoutineExercise }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="rounded-xl border bg-white p-4 shadow-sm">
      <div className="flex justify-between items-center" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center gap-2">
          <span className="text-lg font-semibold text-gray-600"> {exercise.exercise_order < 10 ? `0${exercise.exercise_order}` : exercise.exercise_order}</span>
          <p className="text-xl font-semibold">{exercise.exercise_name}</p>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>
      {isExpanded && (
        <div className="flex justify-between p-2">
          <div className="flex flex-1 flex-col items-center border-r border-gray-300 pr-4">
              <p className="text-gray-600 text-sm">Sets</p>
              <p className="text-gray-800 text-lg">{exercise.sets}</p>
          </div>
          <div className="flex flex-1 flex-col items-center border-r border-gray-300 pr-4">
              <p className="text-gray-600 text-sm">Reps</p>
              <p className="text-gray-800 text-lg">{exercise.reps}</p>
          </div>
          <div className="flex flex-1 flex-col items-center">
              <p className="text-gray-600 text-sm">Descanso</p>
              <p className="text-gray-800 text-lg">{exercise.rest_seconds}s</p>
          </div>
        </div>
      )}
    </div>
  )
}