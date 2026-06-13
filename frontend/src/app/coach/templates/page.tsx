"use client"
import { useTemplates } from "@/features/templates/hooks/use-templates";
import { Template } from "@/features/templates/types/templates.type";
import Link from "next/link";

export default function TemplatesPage() {
  const { data: templates } = useTemplates();
  console.log(templates);
  
  return (
    <div className="max-w-6xl mx-auto p-6">

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Plantillas
          </h1>

          <p className="text-gray-500 mt-1">
            Gestiona tus plantillas de entrenamiento
          </p>
        </div>

        <button
          className="
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-50
          "
        >
          Crear Plantilla
        </button>
      </div>

      <div className="grid gap-4">
        { templates && templates.length > 0 ? (
          templates.map((template: Template) => (
            <Link key={template.id} href={`/coach/templates/${template.id}`} className="border rounded-xl p-5 bg-white">
              <h2 className="text-xl font-semibold">{template.name}</h2>
              <p className="text-gray-600 mt-2">{template.description}</p>
              <p className="text-gray-500 mt-2">Fecha de creación: { new Date(template.created_at).toLocaleDateString()}</p>
            </Link>
          ))
        ) : (
          <p>No hay plantillas</p>
        )}
      </div>

    </div>
  );
}