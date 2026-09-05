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
    <aside className="min-h-0 shrink-0 border-t border-border px-2 py-2 lg:flex lg:max-h-[16vh] lg:flex-col lg:p-3.5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Seleccionados</h3>
        </div>
        <Badge variant="outline">{exercises.length}</Badge>
      </div>

      <div className="flex flex-wrap justify-start items-center content-center mt-3 max-h-[16vh] gap-2 overflow-y-auto pr-1 lg:max-h-none lg:flex-1">
        {exercises.length === 0 ? (
          <div className="flex items-center justify-center py-1 text-center text-xs text-muted-foreground ">
            Aún no has seleccionado ejercicios
          </div>
        ) : (
          exercises.map((exercise) => (
            <div key={exercise.id} className="flex h-8 w-fit max-w-full items-center gap-2 rounded-2xl border border-border bg-background px-2.5 py-0.5">
              <div className="min-w-0">
                <div className="truncate text-xs font-medium">{exercise.name}</div>
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
