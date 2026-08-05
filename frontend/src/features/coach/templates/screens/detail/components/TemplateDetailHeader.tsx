import Link from "next/link";
import { ArrowLeft, CalendarDays, Copy, Edit3, Trash2, Users } from "lucide-react";

import { H1, Muted, Text } from "@/components/typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Template } from "@/features/coach/templates/types/templates.type";
import { formatDate } from "@/features/coach/templates/components/utils";
import DeleteTemplateDialog from "../../../components/dialog/DeleteTemplateDialog";

interface TemplateDetailHeaderProps {
  template: Template;
  templateId: string;
  isDeleting?: boolean;
  onDelete: () => Promise<void>;
}

export default function TemplateDetailHeader({
  template,
  templateId,
  isDeleting = false,
  onDelete,
}: TemplateDetailHeaderProps) {
  return (
    <section className="space-y-4">
      <Button asChild variant="ghost" className="w-fit text-muted-foreground hover:text-foreground">
        <Link href="/coach/templates">
          <ArrowLeft className="h-4 w-4" />
          Volver a plantillas
        </Link>
      </Button>

      <Card className="border-border bg-card/95 text-card-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.02)]">
        <CardHeader className="gap-4 border-b border-border pb-5">
          <div className="flex flex-col gap-5 lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[0.7rem] uppercase tracking-[0.16em] text-primary flex items-center gap-1">
                  <CalendarDays className="size-4" />
                  Plantilla de ejercicio
                </span>
                <Badge variant="secondary" className="bg-popover text-popover-foreground hover:bg-popover">
                  {template.exercises?.length ?? 0} ejercicios
                </Badge>
              </div>

              <div className="space-y-2">
                <H1 className="text-3xl md:text-4xl">{template.name}</H1>
                <Text className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                  {template.description || "Sin descripción disponible para esta plantilla."}
                </Text>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <Button variant="outline" className="justify-center border-border bg-transparent" disabled>
                <Copy className="h-4 w-4" />
                Duplicar
              </Button>

              <Button variant="outline" className="justify-center border-border bg-transparent" disabled>
                <Users className="h-4 w-4" />
                Asignar a cliente
              </Button>

              <Button asChild className="justify-center sm:col-span-1">
                <Link href={`/coach/templates/${templateId}/edit`}>
                  <Edit3 className="h-4 w-4" />
                  Editar
                </Link>
              </Button>

              <DeleteTemplateDialog 
                templateId={Number(templateId)} 
                buttonLabel="Eliminar" 
                linkRedirect="/coach/templates" 
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>Creada el {formatDate(template.created_at)}</span>
            </div>

            <div className="hidden h-4 w-px bg-border sm:block" />

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Última actualización {formatDate(template.updated_at)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}