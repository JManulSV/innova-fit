"use client";

import { useState } from "react";
import { Minus, Plus, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { ActiveExerciseForm, SessionExercise } from "../types";

interface ActiveExerciseCardProps {
  exercise: SessionExercise;
  index: number;
  total: number;
  onComplete: (
    index: number,
    log: Omit<ActiveExerciseForm, never>
  ) => void;
}

function Stepper({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <div className="flex items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={() => onChange(Math.max(min, value - 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          inputMode="numeric"
          value={value}
          min={min}
          className="text-center font-semibold"
          onChange={(e) => {
            const parsed = parseInt(e.target.value, 10);
            if (!isNaN(parsed) && parsed >= min) onChange(parsed);
          }}
        />
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="h-10 w-10 shrink-0"
          onClick={() => onChange(value + 1)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export function ActiveExerciseCard({
  exercise,
  index,
  total,
  onComplete,
}: ActiveExerciseCardProps) {
  const [form, setForm] = useState<ActiveExerciseForm>({
    sets: exercise.log?.completedSets ?? exercise.targetSets,
    reps: exercise.log?.completedReps ?? exercise.targetReps,
    weight: exercise.log?.performedWeight ?? exercise.suggestedWeight,
    notes: exercise.log?.notes ?? "",
  });
  const [showNotes, setShowNotes] = useState(
    Boolean(exercise.log?.notes)
  );

  function updateField<K extends keyof ActiveExerciseForm>(
    key: K,
    value: ActiveExerciseForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const objectiveParts = [
    `${exercise.targetSets} series`,
    `${exercise.targetReps} reps`,
    exercise.suggestedWeight != null
      ? `${exercise.suggestedWeight} kg sugerido`
      : null,
  ].filter(Boolean);

  return (
    <div className="rounded-xl border border-primary bg-card p-4 shadow-sm">
      {/* Header */}
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        Ejercicio {index + 1} de {total}
      </p>
      <h2 className="mb-1 text-xl font-black">{exercise.name}</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        Objetivo: {objectiveParts.join(" · ")}
      </p>

      {/* Steppers */}
      <div className="mb-4 flex gap-3">
        <Stepper
          label="Series"
          value={form.sets}
          min={1}
          onChange={(v) => updateField("sets", v)}
        />
        <Stepper
          label="Reps"
          value={form.reps}
          min={1}
          onChange={(v) => updateField("reps", v)}
        />
      </div>

      {/* Weight */}
      <div className="mb-4">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Peso utilizado (kg) · Opcional
        </p>
        <Input
          type="number"
          inputMode="decimal"
          placeholder="0"
          value={form.weight ?? ""}
          onChange={(e) => {
            const val = e.target.value;
            updateField(
              "weight",
              val === "" ? null : parseFloat(val)
            );
          }}
        />
      </div>

      {/* Notes */}
      {showNotes ? (
        <div className="mb-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Nota
          </p>
          <textarea
            placeholder="Agrega una nota..."
            value={form.notes}
            rows={2}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            onChange={(e) => updateField("notes", e.target.value)}
          />
        </div>
      ) : (
        <button
          type="button"
          className="mb-4 text-sm text-primary underline-offset-2 hover:underline"
          onClick={() => setShowNotes(true)}
        >
          + Agregar nota
        </button>
      )}

      {/* Complete button */}
      <Button
        className="w-full"
        onClick={() => onComplete(index, form)}
      >
        <CheckCircle2 className="mr-2 h-4 w-4" />
        Completar ejercicio
      </Button>
    </div>
  );
}
