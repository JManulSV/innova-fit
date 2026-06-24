"use client";
import { useState, useEffect } from "react"
import { Template, WorkoutTemplateExercise } from "../types/templates.type";
import AddExerciseModal from "./AddExerciseModal";
import { useExercises } from "@/features/exercises/hooks/use-exercises";
import { useTemplateBuilder } from "../hooks/useTemplateBuilder";
import { EllipsisVerticalIcon } from "lucide-react";
import EditExerciseModal from "./EditExerciseModal";
import { useRouter } from "next/navigation";


interface TemplateFormProps {
  mode: "create" | "edit";
  initialData?: Template;
  onSubmit: (data: {name: string, description: string, exercises: WorkoutTemplateExercise[]}) => void;
  isLoading?: boolean;
}

export default function TemplateForm({ mode, initialData, onSubmit, isLoading }: TemplateFormProps){
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    
    const { data: exercises, isLoading: isLoadingExercises } = useExercises();
    const { selectedExercises, getExercise, addExercise, deleteExercise, updateExercise, initializeExercises } = useTemplateBuilder();

    const [activeModal, setActiveModal] = useState<"add" | "edit" | null>(null);
    const [exerciseToEdit, setExerciseToEdit] = useState<WorkoutTemplateExercise|null>(null);
    const closeModal = () => {
        setActiveModal(null);
        setExerciseToEdit(null);
    };
    console.log("initialData", initialData);

    const formTitle = mode === "create" ? "Crear Plantilla" : "Editar Plantilla";
    const submitButtonText = mode === "create" ? "Crear" : "Guardar";
    const loadingButtonText = mode === "create" ? "Creando..." : "Guardando...";

    const router = useRouter();

      useEffect(() => {
        if (!initialData) return;

        setName(initialData.name);
        setDescription(initialData.description);

        initializeExercises(initialData.exercises || []);

    }, [initialData]);
    
    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        await onSubmit({name, description, exercises: selectedExercises});
        router.push("/coach/templates");
    }

    return (
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        {formTitle}
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
            <button type="button" className="px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer" onClick={() => {setActiveModal("add")}}>
              Agregar Ejercicio
            </button>
          </div>
          {
            selectedExercises.map((exercise: WorkoutTemplateExercise) => (
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
                  <button type="button" className="text-blue-500" onClick={() => {setExerciseToEdit(exercise); setActiveModal("edit")}}>
                    Editar
                  </button>
                  <button type="button" className="text-red-500" onClick={() => deleteExercise(exercise.exercise_id)}>
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          }
      </div>

        <button
          type="submit"
          disabled={isLoading}
          className="
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-50
          "
        >
          {isLoading ? loadingButtonText : submitButtonText}
        </button>


      </form>
      {activeModal === "add" && (<AddExerciseModal exercises={exercises?.data?.data || []} isLoading={isLoadingExercises} onClose={closeModal} getExercise={getExercise} onAdd={addExercise} />)}
      {activeModal === "edit" && exerciseToEdit && (<EditExerciseModal exercise={exerciseToEdit} closeModal={closeModal} updateExercise={updateExercise}  />)}
    </div>
  );
}