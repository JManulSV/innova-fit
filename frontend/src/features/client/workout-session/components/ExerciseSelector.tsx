import { ChevronRight, X } from 'lucide-react';
import { WorkoutExerciseLog } from '../hooks/use-workout-session';

interface ExerciseSelectorProps {
  exercise: WorkoutExerciseLog[];
  isOpen: boolean;
  onClose: () => void;
  activeExerciseId?: string | number; // Opcional: para usar tu estilo activo
  changeCurrentExercise: (id: number) => void;
}

export default function ExerciseSelector({ exercise, isOpen, onClose, activeExerciseId, changeCurrentExercise }: ExerciseSelectorProps) {
  // Si el modal no está abierto, no renderiza nada
  if (!isOpen) return null;
  if (!exercise) return null;

  const styleActiveElement = "bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500/20";

  return (
    // Fondo oscuro con desenfoque (Backdrop)
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 backdrop-blur-sm transition-opacity animate-fade-in" onClick={onClose}>
      
      {/* Contenedor del Modal Inferior */}
      <div 
        className="w-full max-w-lg bg-white rounded-t-2xl pb-8 pt-4 px-4 shadow-2xl flex flex-col gap-5 max-h-[85vh] overflow-y-auto transform transition-transform animate-slide-up"
        onClick={(e) => e.stopPropagation()} // Evita que se cierre al hacer click dentro
      >
        {/* Barra superior/Indicador de arrastre visual */}
        <div className="mx-auto h-1.5 w-12 rounded-full bg-gray-300 mb-1" />

        {/* Encabezado */}
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Tu Rutina</h3>
            <p className="text-xs text-gray-500 mt-0.5">Toca cualquier ejercicio para saltar directo, sin orden fijo</p>
          </div>
          <button 
            onClick={() => onClose()}
            className="p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Lista de Ejercicios */}
        <div className="flex flex-col gap-2.5 overflow-y-auto pr-1">
          {exercise.map((item, index) => {
            const isCompleted = item.sets.every((set) => set.finish);
            const isActive = item.id === activeExerciseId;

            return (
              <div 
                key={item.id} 
                className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center bg-white hover:border-gray-300
                  ${isActive ? styleActiveElement : 'border-gray-100 shadow-sm'}
                `}
                onClick={() => changeCurrentExercise(index)}
              >
                {/* Izquierda: Número y Nombre */}
                <div className="flex items-center gap-3.5">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg border text-xs font-bold
                    ${isActive ? 'bg-emerald-500 border-emerald-500 text-white' : 'bg-gray-50 border-gray-200 text-gray-500'}
                  `}>
                    {index + 1}
                  </span>
                  <h4 className="text-base font-semibold text-gray-800">{item.name}</h4>
                </div>

                {/* Derecha: Contador de Series y Flecha */}
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-md
                    ${isCompleted ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}
                  `}>
                    {item.sets.filter((s) => s.finish).length} / {item.sets.length} series
                  </span>
                  <ChevronRight size={18} className="text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}