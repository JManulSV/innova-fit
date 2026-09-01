import type { SessionExercise } from "../types";

interface CollapsedExerciseCardProps {
  exercise: SessionExercise;
  position: number;
}

const CIRCLED_NUMBERS = ["①", "②", "③", "④", "⑤", "⑥", "⑦", "⑧", "⑨", "⑩"];

function getPositionLabel(position: number): string {
  return CIRCLED_NUMBERS[position - 1] ?? `${position}.`;
}

export function CollapsedExerciseCard({
  exercise,
  position,
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
    <div className="flex items-center gap-3 px-4 py-3">
      <span className="shrink-0 text-xl text-muted-foreground">
        {getPositionLabel(position)}
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{exercise.name}</p>
        <p className="text-sm text-muted-foreground">{details}</p>
      </div>
      <span className="shrink-0 text-muted-foreground">›</span>
    </div>
  );
}
