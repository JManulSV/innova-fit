import { useRef, useState } from "react";
import { WorkoutTemplateExercise } from "../types/templates.type";

interface EditExerciseModalProps {
  exercise: WorkoutTemplateExercise | null;
  closeModal: () => void;
  updateExercise: (id: number, exercise: WorkoutTemplateExercise) => void;
}

export default function EditExerciseModal({exercise, closeModal, updateExercise}: EditExerciseModalProps) {

  const name = exercise?.name || "";
  const [reps, setReps] = useState(exercise?.reps || 0);
  const [rest, setRest] = useState(exercise?.rest_seconds || 0);
  const [sets, setSets] = useState(exercise?.sets || 0);
  const backdrop = useRef<HTMLDivElement>(null);
  
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdrop.current) {
      closeModal()
    }
  }

  const handleOnClick = () => {
    if (exercise) {
      updateExercise(exercise.exercise_id, { ...exercise, reps, sets, rest_seconds: rest })
      closeModal()
    }
    
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" ref={backdrop} onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Editar Ejercicio</h2>
        <form className="flex flex-col gap-4 w-lg">
          <label className="flex flex-col gap-1">
            Nombre
            <input type="text" className="border rounded px-2 py-1" value={name} disabled={true} />
          </label>

          <label className="flex flex-col gap-1">
            Repeticiones
            <input type="number" className="border rounded px-2 py-1" value={reps} onChange={(e) => setReps(Number(e.target.value))} />
          </label>

          <label className="flex flex-col gap-1">
            Descanso
            <input type="number" className="border rounded px-2 py-1" value={rest} onChange={(e) => setRest(Number(e.target.value))} />
          </label>

          <label className="flex flex-col gap-1">
            Sets
            <input type="number" className="border rounded px-2 py-1" value={sets} onChange={(e) => setSets(Number(e.target.value))} />
          </label>

          <button onClick={() => handleOnClick()} type="button" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}