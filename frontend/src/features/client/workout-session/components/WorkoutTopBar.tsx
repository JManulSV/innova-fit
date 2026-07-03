import { List, X } from "lucide-react";
import { WorkoutExerciseLog } from "../hooks/use-workout-session";

interface WorkoutProgressProps{
    exercises: WorkoutExerciseLog[];
    openModal: () => void;
}

export default function WorkoutTopBar({exercises, openModal}: WorkoutProgressProps) {
  return (
    <div className="flex flex-col gap-5">
        <div className="flex justify-between">
            <X />
            <button onClick={openModal}>
                <List  />
            </button>
        </div>
        <div className="flex justify-between w-full gap-4">
            {exercises.map((exercise) => (
                <WorkoutProgressItem exercise={exercise} key={exercise.id} />   
            ))}
        </div>

    </div>
  )
}

interface WorkoutProgressItemProps{
    exercise: WorkoutExerciseLog;
}

function WorkoutProgressItem({exercise}: WorkoutProgressItemProps){
    return (<div className={`h-1 flex-1 rounded border ${exercise.isComplete ?  'bg-green-800' : 'bg-gray-400'} `}></div>)
}