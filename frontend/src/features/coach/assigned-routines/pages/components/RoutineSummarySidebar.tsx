"use client";

import { CalendarDays } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { Template } from "../../../templates/types/templates.type";
import type { RepeatMode, WizardStep, RoutineExercise } from "./types";

interface Props {
  step: WizardStep;
  selectedTemplate: Template | null;
  routineExercises: RoutineExercise[];
  routineNotes: string;
  repeatMode: RepeatMode;
  startDate: string;
  endDate: string;
  onStepChange: (step: WizardStep) => void;
  onRoutineNotesChange: (value: string) => void;
  onRepeatModeChange: (value: RepeatMode) => void;
  onStartDateChange: (value: string) => void;
  onEndDateChange: (value: string) => void;
}

export default function RoutineSummarySidebar({ step, selectedTemplate, routineExercises, routineNotes, repeatMode, startDate, endDate, onStepChange, onRoutineNotesChange, onRepeatModeChange, onStartDateChange, onEndDateChange }: Props) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
      <Card className="border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Rutina configurada</CardTitle>
          <CardDescription>Resumen de la estructura que vas a asignar.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-2xl border border-border bg-muted/20 p-4">
            <p className="font-medium">{selectedTemplate?.name || "Rutina personalizada"}</p>
            <p className="mt-1 text-sm text-muted-foreground">{selectedTemplate ? `Basado en ${selectedTemplate.name}` : "Basado en ejercicios seleccionados"}</p>
            <p className="mt-2 text-sm text-muted-foreground">{routineExercises.length} ejercicios agregados</p>
          </div>

          <div className="space-y-2">
            {routineExercises.length === 0 ? (
              <p className="text-sm text-muted-foreground">Todavía no hay ejercicios cargados.</p>
            ) : (
              routineExercises.map((exercise) => (
                <div key={`${exercise.exercise_id}-${exercise.exercise_order}`} className="flex items-center justify-between gap-3 text-sm">
                  <span className="truncate">{exercise.name}</span>
                  <span className="shrink-0 text-muted-foreground">{exercise.sets}x{exercise.reps}{exercise.rest_seconds ? ` · ${exercise.rest_seconds}s` : ""}</span>
                </div>
              ))
            )}
          </div>

          {step === 2 && (
            <Button variant="outline" className="w-full" onClick={() => onStepChange(1)}>
              Editar ejercicios
            </Button>
          )}
        </CardContent>
      </Card>

      <Card className="border-border bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Configuración de asignación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 flex flex-col">
          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Fecha de inicio</span>
            <div className="flex items-center gap-2 rounded-xl border border-input px-3 py-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <Input 
                type="date" 
                value={startDate} 
                onChange={(event) => onStartDateChange(event.target.value)} 
                className="border-0 p-0 shadow-none focus-visible:ring-0" />
            </div>
          </label>

          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Fecha limite</span>
            <div className="flex items-center gap-2 rounded-xl border border-input px-3 py-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <Input 
                type="date" 
                value={endDate} 
                onChange={(event) => onEndDateChange(event.target.value)} 
                className="border-0 p-0 shadow-none focus-visible:ring-0" />
            </div>
          </label>

          {/* <div className="space-y-2 text-sm">
            <span className="text-muted-foreground">Repetir</span>
            <div className="grid grid-cols-3 gap-2">
              {([
                ["once", "Una vez"],
                ["weekly", "Semanal"],
                ["custom", "Personalizado"],
              ] as const).map(([value, label]) => (
                <Button key={value} type="button" variant={repeatMode === value ? "default" : "outline"} onClick={() => onRepeatModeChange(value)}>
                  {label}
                </Button>
              ))}
            </div>
          </div> */}

          <label className="space-y-2 text-sm">
            <span className="text-muted-foreground">Nota para cliente</span>
            <textarea
              value={routineNotes}
              onChange={(event) => onRoutineNotesChange(event.target.value)}
              placeholder="Ej. Enfócate en técnica y controla el ritmo..."
              className="min-h-28 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm outline-none ring-0 placeholder:text-muted-foreground focus:border-ring"
            />
          </label>

          {/* <div className="flex gap-2">
            <Badge variant="secondary">{repeatMode}</Badge>
          </div> */}
        </CardContent>
      </Card>
    </aside>
  );
}
