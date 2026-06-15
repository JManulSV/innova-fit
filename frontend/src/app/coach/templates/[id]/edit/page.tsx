"use client";
import { useTemplate } from "@/features/templates/hooks/use-template";
import { useUpdateTemplate } from "@/features/templates/hooks/use-update-template";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditTemplatePage() {
    const { id } = useParams();
    const { mutateAsync: updateTemplate, isPending, error } = useUpdateTemplate()
    const { data: template, isLoading } = useTemplate(id as string);
    const templateData = template?.data;

    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      
      await updateTemplate({ id: id as string, request: { name, description } })
      router.push("/coach/templates");
    }

    useEffect(() => {
      if (templateData) {
        setName(templateData.name);
        setDescription(templateData.description);
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

    </div>
  );
}
