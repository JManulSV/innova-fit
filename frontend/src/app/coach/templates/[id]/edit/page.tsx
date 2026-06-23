"use client";
import { useExercises } from "@/features/exercises/hooks/use-exercises";
import { useTemplate } from "@/features/templates/hooks/use-template";
import { useUpdateTemplate } from "@/features/templates/hooks/use-update-template";
import { TemplateExercise } from "@/features/templates/types/templates.type";
import { EllipsisVerticalIcon, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

// interface TemplateExercisesRequest {
//   exerciseId: string;
//   sets: number;
//   reps: number;
//   restTime: number;
// }

export default function EditTemplatePage() {
    const { id } = useParams();
    const { mutateAsync: updateTemplate, isPending, error } = useUpdateTemplate()
    const { data: template, isLoading } = useTemplate(id as string);
    const templateData = template?.data;
    const { data: exercisesData, isLoading: isLoadingExercises } = useExercises();

    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [exercises, setExercises] = useState<TemplateExercise[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false); 

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      await updateTemplate({ id: id as string, request: { name, description } })
      router.push("/coach/templates");
    }

    useEffect(() => {
      if (templateData) {
        setName(templateData.name);
        setDescription(templateData.description);
        setExercises(templateData.exercises);
      }
    }, [templateData]);
    
  if (isLoading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
    );
  }


  return (
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Editar Plantilla
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

        <div>
          <div className="flex justify-between items-center mb-6">
            <label className="block mb-2">
              Ejercicios
            </label>
            <button type="button" className="px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer" onClick={() => {setIsModalOpen(true)}}>
              Agregar Ejercicio
            </button>
          </div>
          <div className="flex flex-col gap-2">
          {
            exercises.map((exercise: TemplateExercise) => (
              <div key={exercise.id} className="p-4 border">
                <div className="flex justify-between">
                  <p className="font-semibold text-lg text-gray-800">{exercise.name}</p>
                  <EllipsisVerticalIcon className="w-5 h-5" />
                </div>
                <p className="text-sm text-gray-600">{exercise.description}</p>
                <div className="flex gap-2 mt-2">
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.pivot.sets} series</p>
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.pivot.reps} repeticiones</p>
                  <p className="text-sm text-gray-600 rounded-full bg-gray-100 px-2 py-1">{exercise.pivot.rest_seconds} descanso</p>
                </div>
                <div className="flex gap-4">
                  <button className="text-blue-500">
                    Editar
                  </button>
                  <button className="text-red-500">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          }
          </div>
        </div>

        {error && (
          <div className="text-red-500">
            {error.message}
          </div>
        )}

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
          {isPending ? "Actualizando..." : "Actualizar Plantilla"}
        </button>

      </form>
      {isModalOpen ? <AddExerciseModal data={exercisesData?.data.data || []} isLoading={isLoadingExercises} setModalOpen={setIsModalOpen} /> : null}
    </div>
  );
}

function ExerciseModal({ data, setModalOpen }: { data: TemplateExercise | null; setModalOpen: (open: boolean) => void }) {
  const [name, setName] = useState(data?.name || "");
  const [reps, setReps] = useState(data?.pivot.reps || 0);
  const [rest, setRest] = useState(data?.pivot.rest_seconds || 0);
  const [sets, setSets] = useState(data?.pivot.sets || 0);
  const backdrop = useRef<HTMLDivElement>(null);
  
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdrop.current) {
      setModalOpen(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" ref={backdrop} onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Editar Ejercicio</h2>
        <form className="flex flex-col gap-4 w-lg">
          <label className="flex flex-col gap-1">
            Nombre
            <input type="text" className="border rounded px-2 py-1" value={name} onChange={(e) => setName(e.target.value)} />
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

          <button type="submit" className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 cursor-pointer">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
}

function AddExerciseModal({data, isLoading, setModalOpen}: {data: TemplateExercise[], isLoading: boolean, setModalOpen: (open: boolean) => void}) {
  const backdrop = useRef<HTMLDivElement>(null);
  
  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === backdrop.current) {
      setModalOpen(false);
    }
  }
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" ref={backdrop} onClick={handleClose}>
      {isLoading ? <p>Cargando...</p> : data && data.length > 0 ? 
      <div className="bg-white p-6 rounded-lg max-h-96 overflow-y-auto w-lg">
        <h2 className="text-xl font-semibold mb-4">Agregar ejercicio</h2>
        {data.map((exercise) => (
          <div key={exercise.id} className="flex items-center justify-between py-2 border-b border-gray-200">
            <p className="text-lg">{exercise.name}</p>
            <button onClick={() => console.log(exercise)} className="p-1 rounded-full hover:bg-blue-300 bg-blue-500 text-white cursor-pointer"><Plus className="w-3 h-3"  /></button>
          </div>
        ))}
      </div>  : <p>No se encontraron ejercicios :((</p>}
    </div>
  );
};