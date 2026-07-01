"use client"
import { useExercises } from "@/features/coach/exercises/hooks/use-exercises";
import { Exercise } from "@/features/coach/exercises/types/exercise.types";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ExercisesPage() {
    const {data, isLoading, isError, error} = useExercises();
    const exercises = data?.data.data || [];
    const router = useRouter();
    console.log(exercises);

    if (isLoading) {
        return <div>Cargando...</div>;
    }

    if (isError) {
        return <div className="text-red-500 text-center py-4 text-lg font-semibold ">Error: {error?.message}</div>;
    }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Ejercicios</h1>

          <p className="text-gray-500 mt-1">
            Gestiona tu biblioteca de ejercicios
          </p>
        </div>

        <button
          className="
                px-4 py-2
                rounded-lg
                border
                hover:bg-gray-50
            "
          onClick={() => router.push("/coach/exercises/create")}
        >
          Crear Ejercicio
        </button>
      </div>

      {/* Lista */}
      <div className="grid gap-4">
        { exercises.length > 0 ? (
          exercises.map((exercise: Exercise) => (
              <Link key={exercise.id} href={`/coach/exercises/${exercise.id}`} className="border rounded-xl p-5 bg-white">
                  <div className="flex justify-between items-start">
                      <div>
                          <h2 className="text-xl font-semibold">{exercise.name}</h2>
                          <p className="text-gray-600 mt-2">{exercise.description}</p>
                      </div>
                      <div className="flex gap-2">
                        { 
                          exercise.muscle_groups && exercise.muscle_groups.length > 0 && (
                            exercise.muscle_groups.map((muscle: string) => (
                              <span key={muscle} className="text-sm border rounded-full px-3 py-1">{muscle}</span>
                            ))
                          )
                        }
                      </div>
                  </div>
                  <div className="mt-4 text-sm text-gray-500">Creado: {new Date(exercise.created_at).toLocaleDateString()}</div>
              </Link>
          ))
        ) : (
          <div className="text-gray-500 text-center py-4 text-lg font-semibold">No hay ejercicios</div>
        )}
      </div>
    </div>
  );
}
