"use client";
import { useCreateExercise } from "@/features/exercises/hooks/use-create-exercise";
import { useState } from "react";
import { ExerciseCreateRequest } from "@/features/exercises/types/exercise.types";
import { useRouter } from "next/navigation";

export default function CreateExercisePage() {
  const { mutateAsync, isPending, isError, error } = useCreateExercise();
  const [formData, setFormData] = useState<ExerciseCreateRequest>({
    name: "",
    muscle_groups: [],
    description: "",
    instructions: "",
  });
  const router = useRouter();


  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await mutateAsync({...formData, muscle_groups: muscleGroups});
    router.replace('/coach/exercises');
    
  };

  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");

  const addMuscle = () => {
    if (inputValue.trim() !== "") {
      setMuscleGroups([...muscleGroups, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeMuscle = (index: number) => {
    setMuscleGroups(muscleGroups.filter((_, i) => i !== index));
  };

  if (isError) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Crear Ejercicio
        </h1>
        <p>Error al crear el ejercicio</p>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Crear Ejercicio
      </h1>

      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <div>
          <label className="block mb-2">
            Nombre
          </label>

          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

      <h3>Grupos musculares</h3>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Escribe un grupo muscular"
        />
        <button type="button" onClick={addMuscle}>
          Agregar
        </button>
      </div>

      <ul>
        {muscleGroups.map((muscle, index) => (
          <li key={index}>
            {muscle}{" "}
            <button type="button" onClick={() => removeMuscle(index)}>
              ❌
            </button>
          </li>
        ))}
      </ul>

        <div>
          <label className="block mb-2">
            Descripción
          </label>

          <textarea
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-2">
            Instrucciones
          </label>

          <textarea
            rows={6}
            value={formData.instructions}
            onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className="
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-50
          "
          disabled={isPending}
        >
          {isPending ? "Guardando..." : "Guardar Ejercicio"}
        </button>
      </form>
    </div>
  );
}