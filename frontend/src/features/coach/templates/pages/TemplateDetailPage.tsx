"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Container } from "@/components/layout/container";
import { H1, Muted, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteTemplate } from "@/features/coach/templates/hooks/use-delete-template";
import { useTemplate } from "@/features/coach/templates/hooks/use-template";
import TemplateDetailHeader from "@/features/coach/templates/components/template-detail-page/TemplateDetailHeader";
import TemplateDetailMetrics from "@/features/coach/templates/components/template-detail-page/TemplateDetailMetrics";
import TemplateDetailSkeleton from "@/features/coach/templates/components/template-detail-page/TemplateDetailSkeleton";
import TemplateExerciseSequence from "@/features/coach/templates/components/template-detail-page/TemplateExerciseSequence";
import { ArrowLeft } from "lucide-react";

export default function TemplateDetailPage() {
  const { id } = useParams();
  const templateId = id as string | undefined;
  const router = useRouter();
  const { data: template, isLoading, error } = useTemplate(templateId);
  const { mutateAsync: deleteTemplate, isPending } = useDeleteTemplate();
  const templateData = template?.data;

  const handleOnDelete = async () => {
    if (!templateId) return;

    if (window.confirm("¿Estás seguro de eliminar esta plantilla?")) {
      await deleteTemplate(templateId);
      router.push("/coach/templates");
    }
  };

  if (!templateId) {
    return (
      <Container className="py-6 md:py-8">
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>ID de plantilla inválido</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Text className="text-sm text-muted-foreground">
              No fue posible resolver la plantilla solicitada.
            </Text>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/coach/templates">
                <ArrowLeft className="h-4 w-4" />
                Volver a plantillas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container className="py-6 md:py-8">
        <TemplateDetailSkeleton />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-6 md:py-8">
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Error al cargar la plantilla</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Text className="text-sm text-muted-foreground">{error.message}</Text>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/coach/templates">
                <ArrowLeft className="h-4 w-4" />
                Volver a plantillas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  if (!templateData) {
    return (
      <Container className="py-6 md:py-8">
        <Card className="border-border bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>Plantilla no encontrada</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Text className="text-sm text-muted-foreground">
              La plantilla que buscas no existe o no tienes permiso para verla.
            </Text>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/coach/templates">
                <ArrowLeft className="h-4 w-4" />
                Volver a plantillas
              </Link>
            </Button>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="space-y-6 py-6 md:space-y-8 md:py-8">
      <TemplateDetailHeader
        template={templateData}
        templateId={templateId}
        isDeleting={isPending}
        onDelete={handleOnDelete}
      />

      <TemplateDetailMetrics template={templateData} />

      <div className="space-y-3">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-1">
            <Muted className="text-xs uppercase tracking-[0.18em] text-primary/80">
              Secuencia de ejercicios
            </Muted>
            <H1 className="text-2xl md:text-3xl">Orden de ejecución</H1>
          </div>
        </div>

        <TemplateExerciseSequence exercises={templateData.exercises ?? []} />
      </div>
    </Container>
  );
}
