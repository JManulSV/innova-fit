"use client";

import { Button } from "@/components/ui/button";

type Props = {
  selectedCount: number;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function ExerciseSelectorFooter({ selectedCount, onCancel, onConfirm }: Props) {
  return (
    <div className="border-t px-4 py-3 lg:px-4 lg:py-2.5">
      <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-[11px] text-muted-foreground lg:text-sm">{selectedCount} ejercicios seleccionados</div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="h-7 px-3 text-[11px] lg:h-8 lg:text-sm" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="button" className="h-7 px-3 text-[11px] lg:h-8 lg:text-sm" onClick={onConfirm} disabled={selectedCount === 0}>
            Agregar
          </Button>
        </div>
      </div>
    </div>
  );
}
