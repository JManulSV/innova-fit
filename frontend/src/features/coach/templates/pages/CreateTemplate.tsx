"use client";

import TemplateBuilderPage from "@/features/coach/templates/components/template-builder/TemplateBuilderPage";
import { useCreateTemplate } from "@/features/coach/templates/hooks/use-create-template";

export default function CreateTemplatePage() {
  const { mutateAsync: createTemplate, isPending: isCreating } = useCreateTemplate();

  return (
    <TemplateBuilderPage
      title="Nueva plantilla de ejercicios"
      description="Define el nombre, la descripción y los ejercicios que formarán parte de esta plantilla."
      submitLabel="Guardar plantilla"
      submittingLabel="Guardando..."
      isSubmitting={isCreating}
      onSubmit={async (values, exercises) => {
        await createTemplate({ name: values.name, description: values.description ?? "", exercises });
      }}
    />
  );
}
