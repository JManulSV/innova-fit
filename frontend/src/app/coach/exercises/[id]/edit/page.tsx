"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useExercise } from "@/features/exercises/hooks/use-exercise";
import { useEditExercise } from "@/features/exercises/hooks/use-edit-exercise";

export default function EditExercisePage() {
  const { id } = useParams();
  const { mutateAsync, isPending, isError, error } = useEditExercise();
  
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [instructions, setInstructions] = useState("");
  const [muscleGroups, setMuscleGroups] = useState<string[]>([]);

  const router = useRouter();

  const { data: exerciseData, isLoading } = useExercise(id as string);
  const exercise = exerciseData?.data;  

  useEffect(() => {
    if (!exercise) {
      return;
    }

    setName(exercise.name);
    setDescription(exercise.description);
    setInstructions(exercise.instructions);

    setMuscleGroups(exercise.muscle_groups ? exercise.muscle_groups : []);

  }, [exercise]);


  const handleOnSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await mutateAsync({id: id as string, data: {
      name: name,
      description: description,
      instructions: instructions,
      muscle_groups: muscleGroups
    }});
    router.replace('/coach/exercises');
    
  };

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

  if (isLoading) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Editar Ejercicio
        </h1>
        <p>Cargando...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold mb-6">
          Editar Ejercicio
        </h1>
        <p>Error al crear el ejercicio</p>
        <p>{error?.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">
        Editar Ejercicio
      </h1>

      <form className="space-y-4" onSubmit={handleOnSubmit}>
        <div>
          <label className="block mb-2">
            Nombre
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        {
        muscleGroups && muscleGroups.length > 0 && (
        muscleGroups.map((muscle, index) => (
          <li key={index}>
            {muscle}{" "}
            <button type="button" onClick={() => removeMuscle(index)}>
              ❌
            </button>
          </li>
        )))}
      </ul>

        <div>
          <label className="block mb-2">
            Descripción
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block mb-2">
            Instrucciones
          </label>

          <textarea
            rows={6}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
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
          {isPending ? "Actualizando..." : "Actualizar Ejercicio"}
        </button>
      </form>
    </div>
  );
}