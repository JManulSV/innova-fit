"use client";
import { useParams, useRouter } from "next/navigation";
import { useTemplate } from "@/features/templates/hooks/use-template";
import { Template } from "@/features/templates/types/templates.type";
import { useDeleteTemplate } from "@/features/templates/hooks/use-delete-template";

export default function TemplateDetailPage() {
  const { id } = useParams();
  const { data: template, isLoading, error } = useTemplate(id as string);
  const { mutateAsync: deleteTemplate, isPending } = useDeleteTemplate();
  const templateData: Template = template?.data;
  const router = useRouter();

  const handleOnDelete = async () => {
    if(window.confirm("¿Estás seguro de eliminar esta plantilla?")) {
      await deleteTemplate(id as string);
      router.push("/coach/templates");
    }
  };

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

  if (!templateData) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Plantilla no encontrada</h1>
          <p className="text-gray-500 mt-2">La plantilla que buscas no existe o no tienes permiso para verla.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Error al cargar la plantilla</h1>
          <p className="text-gray-500 mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          {templateData.name}
        </h1>

        <p className="text-gray-500 mt-2">
          {templateData.description}
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Ejercicios
        </h2>

        <div className="space-y-4">
          {templateData.exercises?.map((exercise) => (
            <div key={exercise.id}>
              <h3 className="text-lg font-semibold">
                {exercise.name}
              </h3>
              <p className="text-gray-500">
                {exercise.description}
              </p>
              <div className="flex gap-4 text-sm text-gray-600 mt-2">
                <p>Series: {exercise.pivot?.sets}</p>
                <p>Repeticiones: {exercise.pivot?.reps}</p>
                <p>Descanso: {exercise.pivot?.rest_seconds} segundos</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="mt-6 flex gap-4">

        <button
          className="
            px-4 py-2
            rounded-lg
            border
          "
          onClick={() => router.push(`/coach/templates/${id}/edit`)}
        >
          Editar
        </button>

        <button
          className="
            px-4 py-2
            rounded-lg
            border
            text-red-600
          "
          onClick={handleOnDelete}
          disabled={isPending}
        >
          {isPending ? "Eliminando..." : "Eliminar"}
        </button>

      </div>

    </div>
  );
}