import { Exercise } from "../../types/exercise.types";
import ExerciseCard from "./ExerciseCard";
import ExercisesPageSkeleton from "./ExercisesPageSkeleton";

interface ExercisesPageGridProps {
  exercises: Exercise[];
  isLoading: boolean;
}

export default function ExercisesPageGrid({ exercises, isLoading }: ExercisesPageGridProps) {
  if (isLoading) {
    return <ExercisesPageSkeleton />;
  }

  if (!exercises || exercises.length === 0) {
    return <p className="text-sm text-muted-foreground">No exercises found.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {exercises.map((exercise: Exercise) => (
        <ExerciseCard key={exercise.id} exercise={exercise} />
      ))}
    </div>
  );
}
