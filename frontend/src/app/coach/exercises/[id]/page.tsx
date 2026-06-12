
"use client";

import { useParams, useRouter } from "next/navigation";
import { useExercise } from "@/features/exercises/hooks/use-exercise";
import { useDeleteExercise } from "@/features/exercises/hooks/use-delete-exercise";

export default function ExerciseDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useExercise(id as string);
  const exercise = data?.data;
  const router = useRouter();
  const deleteMutation = useDeleteExercise();

  const handleOnDelete = async () => {
    if (window.confirm("¿Estás seguro de eliminar este ejercicio?")){
      await deleteMutation.mutateAsync(id as string);
      router.push("/coach/exercises");
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-xl font-bold">
            Cargando...
          </h1>
        </div>
      </div>
    );
  }
  
  if (isError || !data) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            Error: {error?.message || ""}
          </h1>
          <p className="text-gray-500 mt-2">
            No se pudo cargar el ejercicio
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {exercise?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          Detalles del ejercicio
        </p>
      </div>


      <div className="bg-white border rounded-xl p-6">
        {exercise.muscle_groups && exercise.muscle_groups.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {exercise.muscle_groups.map((muscle: string) => (
              <span key={muscle} className="border rounded-full px-3 py-1 text-sm">
                {muscle}
              </span>
            ))}
          </div>
        )}
        
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold mb-2">
              Descripción
            </h2>

            <p>
              {exercise?.description}
            </p>
          </div>

          <div>
            <h2 className="font-semibold mb-2">
              Instrucciones
            </h2>

            <p>
              {exercise?.instructions}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button className="px-4 py-2 rounded-lg border" onClick={() => router.push(`/coach/exercises/${id}/edit`)}>
          Editar
        </button>

        <button className="px-4 py-2 rounded-lg border text-red-600" disabled={deleteMutation.isPending} onClick={handleOnDelete}>
          {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
        </button>
      </div>
    </div>
  );
}