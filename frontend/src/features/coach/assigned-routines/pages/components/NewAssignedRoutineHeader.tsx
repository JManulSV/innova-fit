"use client";

import { Sparkles } from "lucide-react";

import { PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";
import type { WizardStep } from "./types";
import { Button } from "@/components/ui/button";

interface Props {
  step: WizardStep;
  routineExerciseCount: number;
  onStepChange: (step: WizardStep) => void;
}

export default function NewAssignedRoutineHeader({ step, routineExerciseCount, onStepChange }: Props) {
  return (
    <PageHeader>
      <PageTitleGroup>
        <div className="mb-1 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
          <Sparkles className="size-3.5" />
          Plantillas &gt; Nueva asignación
        </div>
        <PageTitle>Nueva asignación de rutina</PageTitle>
        <PageDescription>Selecciona una plantilla o arma la rutina, luego elige clientes y fecha de inicio.</PageDescription>
      </PageTitleGroup>

      <div className="flex items-center gap-2 rounded-full border border-border bg-card p-1 text-sm">
        <Button 
          variant={step === 1 ? "default" : "ghost"}
          type="button" 
          onClick={() => onStepChange(1)}
          disabled={step === 2 && routineExerciseCount === 0}
          className="cursor-pointer">
          ● 1 Ejercicios
        </Button>
        <Button
          variant={step === 2 ? "default" : "ghost"} 
          type="button"
          onClick={() => routineExerciseCount > 0 && onStepChange(2)}
          disabled={routineExerciseCount === 0}
          className="cursor-pointer">
          ○ 2 Clientes
        </Button>
      </div>
    </PageHeader>
  );
}
