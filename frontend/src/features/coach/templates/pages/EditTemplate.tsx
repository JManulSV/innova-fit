"use client";

import { useParams, useRouter } from "next/navigation";

import { Container } from "@/components/design-system/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TemplateBuilderPage from "@/features/coach/templates/components/template-builder/TemplateBuilderPage";
import { useTemplate } from "@/features/coach/templates/hooks/use-template";
import { useUpdateTemplate } from "@/features/coach/templates/hooks/use-update-template";

export default function EditTemplatePage() {
  const router = useRouter();
  const params = useParams();
  const templateId = params.id as string | undefined;

  const { data: templateResponse, isLoading: isLoadingTemplate, error } = useTemplate(templateId);
  const template = templateResponse?.data;
  const { mutateAsync: updateTemplate, isPending: isUpdating } = useUpdateTemplate();

  if (!templateId) {
    return (
      <Container className="py-6">
        <Card className="border-border bg-card text-card-foreground">
          <CardContent className="space-y-4 py-6">
            <h1 className="text-xl font-semibold">ID de plantilla inválido</h1>
            <p className="text-sm text-muted-foreground">No fue posible resolver la plantilla solicitada.</p>
            <Button variant="outline" className="w-fit" onClick={() => router.push("/coach/templates")}>
              Volver a plantillas
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (isLoadingTemplate) {
    return (
      <Container className="py-6">
        <Card className="border-border bg-card text-card-foreground">
          <CardContent className="py-6">Cargando plantilla...</CardContent>
        </Card>
      </Container>
    );
  }

  if (error || !template) {
    return (
      <Container className="py-6">
        <Card className="border-border bg-card text-card-foreground">
          <CardContent className="space-y-4 py-6">
            <h1 className="text-xl font-semibold">{error ? "Error al cargar la plantilla" : "Plantilla no encontrada"}</h1>
            <p className="text-sm text-muted-foreground">{error ? error.message : "La plantilla que buscas no existe o no tienes permiso para verla."}</p>
            <Button variant="outline" className="w-fit" onClick={() => router.push("/coach/templates")}>
              Volver a plantillas
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <TemplateBuilderPage
      title="Editar plantilla de ejercicios"
      description="Ajusta el nombre, la descripción y la secuencia de ejercicios de esta plantilla."
      defaultName={template.name}
      defaultDescription={template.description}
      initialExercises={template.exercises}
      submitLabel="Guardar cambios"
      submittingLabel="Guardando..."
      isSubmitting={isUpdating}
      onSubmit={async (values, exercises) => {
        if (!templateId) return;

        await updateTemplate({
          id: templateId,
          request: {
            name: values.name,
            description: values.description ?? "",
            exercises,
          },
        });

        router.push(`/coach/templates/${templateId}`);
      }}
      onCancel={() => router.push(`/coach/templates/${templateId}`)}
    />
  );
}
