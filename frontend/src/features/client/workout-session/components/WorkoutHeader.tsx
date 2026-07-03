import { WorkoutExerciseLog } from "../hooks/use-workout-session";

interface WorkoutHeaderProps {
  exercises: WorkoutExerciseLog[];
  currentExercise: WorkoutExerciseLog;
  currentIndex: number;
}

export default function WorkoutHeader({ exercises, currentExercise, currentIndex }: WorkoutHeaderProps) {
    
    if(!currentExercise){
        return <div>Cargando...</div>;
    }

  return (
    <div>
        <p className="text-gray-700">Ejercicio {currentIndex + 1} de {exercises.length}</p>
        <h2 className="text-3xl font-bold">{currentExercise.name}</h2>
    </div>
  )
}
