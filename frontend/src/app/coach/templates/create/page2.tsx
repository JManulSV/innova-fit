"use client"
import { useCreateTemplate } from "@/features/templates/hooks/use-create-template";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { TemplateExercise } from "@/features/templates/types/templates.type";
import { useExercises } from "@/features/exercises/hooks/use-exercises";
import { Check, EllipsisVerticalIcon, Plus } from "lucide-react";
import { Exercise } from "@/features/exercises/types/exercise.types";

export interface TemplateExerciseConfig {
  exercise_id: number;
  name: string;
  sets: number;
  reps: number;
  rest_seconds: number;
  exercise_order: number;
}

export default function CreateTemplatePage() {
  const { mutateAsync: createTemplate, isPending, error } = useCreateTemplate();
  const { data: exercisesData, isLoading } = useExercises()
  const [name, setName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<TemplateExerciseConfig[]>([]);
  const [editExerciseId, setEditExerciseId] = useState<number | null>(null);
  const router = useRouter();
  const exercises = exercisesData?.data.data;

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // await createTemplate({ name, description });
    console.log({ name, description, selectedExercise });
    // router.push("/coach/templates");
  };

  const handleOnDelete = (id: number) => {
    setSelectedExercise(selectedExercise.filter((exercise) => exercise.exercise_id !== id));
  };

  return (
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Crear Plantilla
      </h1>

      <form className="space-y-4" onSubmit={handleOnSubmit}>

        <div>
          <label className="block mb-2">
            Nombre
          </label>

          <input
            type="text"
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-2">
            Descripción
          </label>

          <textarea
            rows={5}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {error && (
          <div className="text-red-500">
            {error.message}
          </div>
        )}

      <div>
          <div className="flex justify-between items-center mb-6">
            <label className="block mb-2">
              Ejercicios
            </label>
            <button type="button" className="px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer" onClick={() => {setIsModalOpen(true)}}>
              Agregar Ejercicio
            </button>
          </div>
          {
            selectedExercise.map((exercise: TemplateExerciseConfig) => (
              <div key={exercise.exercise_id} className="p-4 border">
                <div className="flex justify-between">
                  <p className="font-semibold text-lg text-gray-800">{exercise.name}</p>
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </div>
                {/* <p className="text-sm text-gray-600">{exercise.description}</p> */}
                <div className="flex gap-2 mt-2">
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.sets} series</p>
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.reps} repeticiones</p>
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.rest_seconds}s descanso</p>
                </div>
                <div className="flex gap-4">
                  <button className="text-blue-500" onClick={() => {setEditExerciseId(exercise.exercise_id); setIsEditModalOpen(true)}}>
                    Editar
                  </button>
                  <button className="text-red-500" onClick={() => {handleOnDelete(exercise.exercise_id)}}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          }
      </div>

        <button
          type="submit"
          disabled={isPending}
          className="
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-50
          "
        >
          {isPending ? "Guardando..." : "Guardar Plantilla"}
        </button>


      </form>
      {isModalOpen ? <AddExerciseModal data={exercises || []} isLoading={isLoading} setModalOpen={setIsModalOpen} selectedExercise={selectedExercise} setSelectedExercise={setSelectedExercise} /> : null}
      {isEditModalOpen ? <ExerciseModal exerciseId={editExerciseId || 0} setModalOpen={setIsEditModalOpen} exercises={selectedExercise || []} setSelectedExercise={setSelectedExercise} selectedExercise={selectedExercise} /> : null}
    </div>
  );
}

function AddExerciseModal({data, isLoading, setModalOpen, selectedExercise, setSelectedExercise}: {data: TemplateExercise[], isLoading: boolean, setModalOpen: (open: boolean) => void, selectedExercise: TemplateExerciseConfig[], setSelectedExercise: (exercise: TemplateExerciseConfig[]) => void}) {
  const backdrop = useRef<HTMLDivElement>(null);
  
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdrop.current) {
      setModalOpen(false);
    }
  }

  const handleSelectExercise = (exercise: Exercise) => {
    //Validate if the exercise exist
    const exerciseExist = selectedExercise.find((ex) => ex.exercise_id === exercise.id);
    if (exerciseExist) {
      setSelectedExercise(selectedExercise.filter((item) => item.exercise_id !== exercise.id));
      return;
    }

    const newExercise = {
      exercise_id: exercise.id,
      name: exercise.name,
      sets: 4,
      reps: 10,
      rest_seconds: 60,
      exercise_order: selectedExercise.length + 1
    };

    setSelectedExercise([...selectedExercise, newExercise]);
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" ref={backdrop} onClick={handleClose}>
      {isLoading ? <p>Cargando...</p> : data && data.length > 0 ? 
      <div className="bg-white p-6 rounded-lg max-h-96 overflow-y-auto w-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar ejercicio</h2>
        {data.map((exercise) => (
          <div key={exercise.id} className="flex items-center justify-between py-2 border-b border-gray-200">
            <p className="text-lg">{exercise.name}</p>
            <button onClick={() => handleSelectExercise(exercise)} className="p-1 rounded-full hover:bg-blue-300 bg-blue-500 text-white cursor-pointer">
              {selectedExercise?.find((item) => item.exercise_id === exercise.id) ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3"  />}
            </button>
          </div>
        ))}
      </div>  : <p>No se encontraron ejercicios :((</p>}
    </div>
  );
};

function ExerciseModal({ exerciseId, setModalOpen, exercises, setSelectedExercise, selectedExercise }: { exerciseId: number; setModalOpen: (open: boolean) => void; exercises: TemplateExerciseConfig[]; setSelectedExercise: (exercise: TemplateExerciseConfig[]) => void; selectedExercise: TemplateExerciseConfig[] }) {
  const data = exercises?.find((exercise) => exercise.exercise_id === exerciseId);
  const [name, setName] = useState(data?.name || "");
  const [reps, setReps] = useState(data?.reps || 0);
  const [rest, setRest] = useState(data?.rest_seconds || 0);
  const [sets, setSets] = useState(data?.sets || 0);
  const backdrop = useRef<HTMLDivElement>(null);
  
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdrop.current) {
      setModalOpen(false);
    }
  }

  const handleUpdate = () => {
    setSelectedExercise(selectedExercise.map((exercise) => 
      exercise.exercise_id === exerciseId ? 
      { ...exercise, name, reps, rest, sets } : 
      exercise
    ));
    setModalOpen(false);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" ref={backdrop} onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Editar Ejercicio</h2>
        <form className="flex flex-col gap-4 w-lg">
          <label className="flex flex-col gap-1">
            Nombre
            <input type="text" className="border rounded px-2 py-1" value={name} onChange={(e) => setName(e.target.value)} disabled={true} />
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

          <button onClick={handleUpdate} type="button" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}