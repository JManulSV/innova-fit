"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Plus, Minus } from "lucide-react";
import { WorkoutSessionExercise } from "../types";

interface WorkoutExerciseTableProps {
  exercise: WorkoutSessionExercise;
  exerciseIndex: number;
  onSetRepsChange: (exerciseIndex: number, setIndex: number, delta: number) => void;
  onSetWeightChange: (exerciseIndex: number, setIndex: number, delta: number) => void;
  onSetRepsInput: (exerciseIndex: number, setIndex: number, value: number) => void;
  onSetWeightInput: (exerciseIndex: number, setIndex: number, value: number) => void;
  onCompleteSet: (exerciseIndex: number, setIndex: number) => void;
  onAddSet: (exerciseIndex: number) => void;
}

export default function WorkoutExerciseTable({
  exercise,
  exerciseIndex,
  onSetRepsChange,
  onSetWeightChange,
  onSetRepsInput,
  onSetWeightInput,
  onCompleteSet,
  onAddSet,
}: WorkoutExerciseTableProps) {
  return (
    <div className="space-y-2.5">
      <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2 px-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        <span>#</span>
        <span>N. sets</span>
        <span>Peso</span>
        <span className="sr-only">Estado</span>
      </div>

      {exercise.sets.map((set, setIndex) => {
        const isCompleted = set.status === "completed";

        return (
          <div key={set.id} className={isCompleted ? "rounded-lg bg-background p-3" : "rounded-lg bg-card p-3 transition-colors"}>
            <div className="grid grid-cols-[auto_minmax(0,1fr)_minmax(0,1fr)_auto] items-center gap-2 rounded-md border border-border/60 bg-background/80 px-2 py-1.5">
              <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-muted-foreground">#{setIndex + 1}</p>

              <div className="flex min-w-0 items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  onClick={() => onSetRepsChange(exerciseIndex, setIndex, -1)}
                  disabled={isCompleted}
                >
                  <Minus />
                </Button>
                <Input
                  type="number"
                  inputMode="numeric"
                  min={0}
                  value={set.performedReps}
                  onChange={(event) => onSetRepsInput(exerciseIndex, setIndex, Number(event.target.value || 0))}
                  disabled={isCompleted}
                  className="h-8 min-w-0 flex-1 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  onClick={() => onSetRepsChange(exerciseIndex, setIndex, 1)}
                  disabled={isCompleted}
                >
                  <Plus />
                </Button>
              </div>

              <div className="flex min-w-0 items-center gap-1.5">
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  onClick={() => onSetWeightChange(exerciseIndex, setIndex, -1)}
                  disabled={isCompleted}
                >
                  <Minus />
                </Button>
                <Input
                  type="number"
                  inputMode="decimal"
                  min={0}
                  value={set.performedWeight}
                  onChange={(event) => onSetWeightInput(exerciseIndex, setIndex, Number(event.target.value || 0))}
                  disabled={isCompleted}
                  className="h-8 min-w-0 flex-1 text-center"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon-xs"
                  onClick={() => onSetWeightChange(exerciseIndex, setIndex, 1)}
                  disabled={isCompleted}
                >
                  <Plus />
                </Button>
              </div>

              <Button
                type="button"
                variant={isCompleted ? "default" : "secondary"}
                size="icon-sm"
                onClick={() => onCompleteSet(exerciseIndex, setIndex)}
                disabled={isCompleted}
              >
                <Check />
              </Button>
            </div>
          </div>
        );
      })}

      <Button type="button" variant="outline" size="sm" className="w-full" onClick={() => onAddSet(exerciseIndex)}>
        + Añadir serie
      </Button>
    </div>
  );
}
