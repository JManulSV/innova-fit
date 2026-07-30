"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowDownAZ, CalendarDays, Copy, Edit3, MoreVertical, Trash2, Dumbbell } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "./utils";
import { Template } from "@/features/coach/templates/types/templates.type";
import { Muted, Text, Mono } from "@/components/typography";

interface TemplateCardProps {
  template: Template;
  hasMoreExercises?: boolean;
  onDelete: (id: number) => Promise<void>;
};

export default function TemplateCard({ template, onDelete, hasMoreExercises }: TemplateCardProps) {
  const router = useRouter();
  const exercises = template.exercises ?? [];
  const preview = exercises.slice(0, 3);
  const extraCount = Math.max(exercises.length - preview.length, 0);

  return (
    <Card className="border-border bg-card text-card-foreground ring-1 ring-ring/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] transition-transform duration-200 hover:-translate-y-0.5 hover:border-border hover:bg-popover">
      <CardHeader className="gap-4 border-b border-border pb-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <CardTitle>
              <Text className="text-lg font-semibold text-card-foreground">{template.name}</Text>
            </CardTitle>

            <CardDescription>
              <Muted className="max-w-[36ch] text-sm leading-5 line-clamp-3">{template.description}</Muted>
            </CardDescription>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:bg-popover/5 hover:text-foreground">
                <MoreVertical className="w-4 h-4" />
                <span className="sr-only">Abrir menú</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44 border border-border bg-popover text-popover-foreground">
              <DropdownMenuItem className="flex items-center gap-2" onSelect={() => router.push(`/coach/templates/${template.id}`)}>
                <ArrowDownAZ className="w-4 h-4" />
                Ver detalle
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2" onSelect={() => router.push(`/coach/templates/${template.id}/edit`)}>
                <Edit3 className="w-4 h-4" />
                Editar
              </DropdownMenuItem>

              <DropdownMenuItem className="flex items-center gap-2">
                <Copy className="w-4 h-4" />
                Duplicar
              </DropdownMenuItem>

              <DropdownMenuItem
                variant="destructive"
                className="flex items-center gap-2"
                onClick={async () => {
                  if (window.confirm("¿Eliminar esta plantilla?")) {
                    await onDelete(template.id);
                  }
                }}
              >
                <Trash2 className="w-4 h-4" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className="border-border text-muted-foreground">
            <CalendarDays className="mr-1 w-3 h-3 text-muted-foreground" />
            {formatDate(template.created_at)}
          </Badge>

          <Badge variant="secondary" className="bg-popover text-popover-foreground hover:bg-popover">
            <Dumbbell className="mr-1 w-3 h-3 text-popover-foreground" />
            {exercises.length} ejercicios
          </Badge>

        </div>
      </CardHeader>

      <CardContent className="space-y-4 px-5 py-1">
        <div className="space-y-2 border-border">
          {preview.map((exercise, index) => (
            <div key={exercise.id} className="flex items-start justify-between gap-4 text-sm">
              <div className="min-w-0">
                <Text className="truncate font-medium text-card-foreground">
                  {index + 1}. {exercise.name}
                </Text>
              </div>

              <Mono className="shrink-0 text-xs text-muted-foreground">
                {exercise.sets}x{exercise.reps} - {exercise.rest_seconds}s
              </Mono>
            </div>
          ))}
          
          { hasMoreExercises && <Muted className="text-xs">+{extraCount} más</Muted>}
        </div>
      </CardContent>

      <CardFooter className="gap-2 border-none bg-transparent px-5 py-3">
        <Button asChild variant="outline" className="flex-1 border-border bg-transparent text-card-foreground hover:bg-popover/5">
          <Link href={`/coach/templates/${template.id}/edit`}>
            <Edit3 className="w-4 h-4" />
            Editar
          </Link>
        </Button>

        <Button variant="outline" size="icon-sm" className="border-border bg-transparent text-muted-foreground hover:bg-popover/5">
          <Copy className="w-4 h-4" />
          <span className="sr-only">Duplicar plantilla</span>
        </Button>

        <Button
          variant="outline"
          size="icon-sm"
          className="border-border bg-transparent text-muted-foreground hover:bg-popover/5 hover:text-destructive"
          onClick={async () => {
            if (window.confirm("¿Eliminar esta plantilla?")) {
              await onDelete(template.id);
            }
          }}
        >
          <Trash2 className="w-4 h-4" />
          <span className="sr-only">Eliminar plantilla</span>
        </Button>
      </CardFooter>
    </Card>
  );
}
