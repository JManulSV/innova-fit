"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import type { Exercise } from "../../types/exercise.types";

type Props = {
  exercises: Exercise[];
  onRemove?: (exerciseId: number) => void;
};

export default function ExerciseSelectorSelectedPanel({ exercises, onRemove }: Props) {
  return (
    <aside className="min-h-0 shrink-0 rounded-3xl border border-border bg-muted/20 p-3 lg:flex lg:max-h-[16vh] lg:flex-col lg:p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground lg:text-sm">Seleccionados</h3>
          <p className="text-xs text-muted-foreground lg:text-sm">{exercises.length} ejercicios seleccionados</p>
        </div>
        <Badge variant="outline">{exercises.length}</Badge>
      </div>

      <div className="mt-3 max-h-[16vh] space-y-2 overflow-y-auto pr-1 lg:max-h-none lg:flex-1">
        {exercises.length === 0 ? (
          <div className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-border bg-background px-3 py-4 text-center text-[11px] text-muted-foreground lg:text-sm">
            Aún no has seleccionado ejercicios
          </div>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.id} className="flex items-center justify-between gap-2 rounded-2xl border border-border bg-background px-2.5 py-2">
              <div className="min-w-0">
                <div className="truncate text-[11px] font-medium lg:text-sm">{exercise.name}</div>
                <div className="truncate text-[10px] text-muted-foreground lg:text-xs">{exercise.body_parts?.[0]?.name ?? "Sin parte del cuerpo"}</div>
              </div>

              <Button variant="ghost" size="icon-sm" className="lg:size-6" onClick={() => onRemove?.(exercise.id)} aria-label="Quitar ejercicio seleccionado">
                <span aria-hidden="true">×</span>
              </Button>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
