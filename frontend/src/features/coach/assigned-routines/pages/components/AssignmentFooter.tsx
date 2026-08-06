"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/design-system/container";
import type { WizardStep } from "./types";

interface Props {
  step: WizardStep;
  selectedClientCount: number;
  isSubmitting: boolean;
  canContinue: boolean;
  canAssign: boolean;
  onCancel: () => void;
  onBack: () => void;
  onContinue: () => void;
  onAssign: () => void;
}

export default function AssignmentFooter({ step, selectedClientCount, isSubmitting, canContinue, canAssign, onCancel, onBack, onContinue, onAssign }: Props) {
  return (
    <div className="sticky bottom-0 z-20 border-t border-border bg-background/30 backdrop-blur">
      <Container className="py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">{selectedClientCount} clientes seleccionados</p>

          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            {step === 1 ? (
              <Button onClick={onContinue} disabled={!canContinue}>
                Continuar a clientes <ChevronRight className="size-4" />
              </Button>
            ) : (
              <>
                <Button variant="outline" onClick={onBack}>
                  <ChevronLeft className="size-4" />
                  Volver
                </Button>
                <Button onClick={onAssign} disabled={isSubmitting || !canAssign}>
                  {isSubmitting ? "Asignando..." : "Asignar"}
                </Button>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
