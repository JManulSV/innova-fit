"use client"
import { useCreateTemplate } from "@/features/templates/hooks/use-create-template";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateTemplatePage() {
  const { mutateAsync: createTemplate, isPending, error } = useCreateTemplate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await createTemplate({ name, description });
    router.push("/coach/templates");
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

    </div>
  );
}