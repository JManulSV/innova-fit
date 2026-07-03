import { Check } from "lucide-react";
import { WorkoutExerciseLog } from "../hooks/use-workout-session";

interface WorkoutTableProps {
    exercise: WorkoutExerciseLog;
    handleFinishSet: (exercise_id: number, set_number: number) => void;
}

export default function WorkoutExerciseTable({exercise, handleFinishSet}: WorkoutTableProps) {
  
  if(!exercise){
    return <div>Cargando...</div>;
  }
  
  const numberOfSeries = exercise.completed_sets;
  
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 shadow-sm bg-white p-2">
      <table className="min-w-full divide-y divide-gray-100 text-sm">
        {/* Encabezado con fondo sutil y texto claro pero legible */}
        <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wider text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left">Serie</th>
            <th className="px-4 py-3 text-center">Reps</th>
            <th className="px-4 py-3 text-center">Peso</th>
            <th className="px-4 py-3 text-right"></th>
          </tr>
        </thead>
        
        {/* Cuerpo de la tabla */}
        <tbody className="divide-y divide-gray-100 bg-white">
          {exercise.sets.map((item, index) => (
            <tr 
              key={index} 
              className="hover:bg-slate-50/80 transition-colors"
            >
              {/* Columna Serie: Badge numérico estilizado */}
              <td className="whitespace-nowrap px-4 py-3.5 font-medium text-gray-900">
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {index + 1}
                  </span>
                  <span className="text-gray-400 font-normal text-sm">
                    {exercise.completed_reps} x — Kg
                  </span>
                </div>
              </td>
              
              {/* Columna Repeticiones */}
              <td className="whitespace-nowrap px-4 py-3.5 text-center font-semibold text-gray-700">
                {exercise.completed_reps}
              </td>
              
              {/* Columna Peso */}
              <td className="whitespace-nowrap px-4 py-3.5 text-center text-gray-500">
                <span className="font-medium text-gray-700">—</span> <span className="text-xs text-gray-400">Kg</span>
              </td>
              
              {/* Columna Acción (Aquí puedes meter tu input o botón) */}
              <td className="whitespace-nowrap px-4 py-3.5 text-right text-gray-500">
                <span 
                  onClick={() => handleFinishSet(exercise.id, index)}
                  className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold border  ${item.finish ? 'border-emerald-200 text-emerald-700 bg-emerald-50' : 'border-gray-200 text-gray-700, bg-gray-50'}`}
                >
                  <Check className="h-4 w-4" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
