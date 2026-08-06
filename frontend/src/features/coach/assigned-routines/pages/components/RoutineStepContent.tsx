"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Template } from "../../../templates/types/templates.type";
import type { ClientItem, ClientFilter, WizardStep, RoutineExercise } from "./types";
import RoutineExercisesCard from "./RoutineExercisesCard";
import ClientAssignmentCard from "./ClientAssignmentCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface Props {
  step: WizardStep;
  selectedTemplate: Template | null;
  assignmentName: string;
  routineExercises: RoutineExercise[];
  clientItems: ClientItem[];
  selectedClientIds: number[];
  clientFilter: ClientFilter;
  clientSearch: string;
  isLoadingClients: boolean;
  onOpenTemplatePicker: () => void;
  onClearTemplate: () => void;
  onOpenExercisePicker: () => void;
  onRemoveExercise: (exerciseId: number) => void;
  onUpdateExercise: (exerciseId: number, field: keyof Pick<RoutineExercise, "sets" | "reps" | "rest_seconds">, value: number) => void;
  onClientToggle: (clientId: number) => void;
  onClientFilterChange: (filter: ClientFilter) => void;
  onClientSearchChange: (value: string) => void;
  onAssignmentNameChange: (value: string) => void;
}

export default function RoutineStepContent(props: Props) {
  return (
    <section className="space-y-6">
      {props.step === 1 ? (
        <>
          <Card className="border-border bg-card text-card-foreground">
            <CardHeader>
              <CardTitle>Configurar ejercicios</CardTitle>
              <CardDescription>Elige una plantilla base o arma la rutina desde cero.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <label className="space-y-2 text-sm flex flex-col gap-0.5">
                <span className="text-muted-foreground">Nombre de la rutina asignada</span>
                <Input
                  value={props.assignmentName}
                  onChange={(event) => props.onAssignmentNameChange(event.target.value)}
                  placeholder="Ej. Rutina de piernas de agosto"
                />
              </label>

              <div className="2">
                <div className={cn("rounded-2xl border border-dashed border-border/70 bg-muted/20 p-4 flex justify-between" , props.selectedTemplate ? "bg-primary/20" : "bg-background")}>
                  <div>
                    <p className="text-sm font-medium">{props.selectedTemplate ? props.selectedTemplate.name : "Sin plantilla seleccionada"}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{props.selectedTemplate ? "Puedes editar la rutina antes de pasar a clientes." : "Puedes elegir una como base o continuar desde cero."}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Button 
                      type="button" 
                      onClick={props.onOpenTemplatePicker}
                      variant={props.selectedTemplate ? "secondary" : "default"}
                      >
                      {props.selectedTemplate ? "Cambiar" : "Elegir plantilla"}
                    </Button>
                    {props.selectedTemplate ? (
                      <Button 
                        type="button" 
                        onClick={props.onClearTemplate} 
                        variant={"secondary"}
                        >
                        Quitar
                      </Button>
                    ) : null}
                  </div>
                </div>

              </div>
            </CardContent>
          </Card>
          <RoutineExercisesCard
            routineExercises={props.routineExercises}
            onOpenExercisePicker={props.onOpenExercisePicker}
            onRemoveExercise={props.onRemoveExercise}
            onUpdateExercise={props.onUpdateExercise}
          />
        </>
      ) : (
        <ClientAssignmentCard
          clientItems={props.clientItems}
          selectedClientIds={props.selectedClientIds}
          clientFilter={props.clientFilter}
          clientSearch={props.clientSearch}
          isLoadingClients={props.isLoadingClients}
          onClientToggle={props.onClientToggle}
          onClientFilterChange={props.onClientFilterChange}
          onClientSearchChange={props.onClientSearchChange}
        />
      )}
    </section>
  );
}
