import type { SessionExercise } from "../types";

interface CollapsedExerciseCardProps {
  exercise: SessionExercise;
  position: number;
  onClick?: () => void;
}

export function CollapsedExerciseCard({
  exercise,
  position,
  onClick,
}: CollapsedExerciseCardProps) {
  const details = [
    `${exercise.targetSets} series`,
    `${exercise.targetReps} reps`,
    exercise.suggestedWeight != null
      ? `${exercise.suggestedWeight} kg`
      : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left"
      onClick={onClick}
    >
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/10">
        <span className="shrink-0 text-xs text-muted-foreground">
          {position}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{exercise.name}</p>
        <p className="text-sm text-muted-foreground">{details}</p>
      </div>
      <span className="shrink-0 text-muted-foreground">›</span>
    </div>
  );
}
