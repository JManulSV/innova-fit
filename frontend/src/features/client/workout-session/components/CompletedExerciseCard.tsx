import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SessionExercise } from "../types";

interface CompletedExerciseCardProps {
  exercise: SessionExercise;
  index: number;
  onEdit: (index: number) => void;
  onClick?: (index: number) => void;
}

export function CompletedExerciseCard({
  exercise,
  index,
  onEdit,
  onClick,
}: CompletedExerciseCardProps) {
  const { log } = exercise;

  const summary = log
    ? [
        `${log.completedSets} × ${log.completedReps}`,
        log.performedWeight != null ? `${log.performedWeight} kg` : null,
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left"
      onClick={() => onClick?.(index)}
    >
      <CheckCircle2 className="h-5 w-5 shrink-0 text-green-500" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold">{exercise.name}</p>
        {summary && (
          <p className="text-sm text-muted-foreground">{summary}</p>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={(event) => {
          event.stopPropagation();
          onEdit(index);
        }}
      >
        Editar
      </Button>
    </div>
  );
}
