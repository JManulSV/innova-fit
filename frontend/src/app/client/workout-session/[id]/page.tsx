"use client";

import { useMyRoutine } from '@/features/client/my-routine/hooks/use-get-my-routines';
import { RoutineExercise } from '@/features/client/my-routine/types';
import WorkoutProgress from '@/features/client/workout-session/components/WorkoutProgress';
import WorkoutHeader from '@/features/client/workout-session/components/WorkoutHeader';
import { useWorkoutSession } from '@/features/client/workout-session/hooks/use-workout-session';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import WorkoutInput from '@/features/client/workout-session/components/WorkoutTable';
import WorkoutButton from '@/features/client/workout-session/components/WorkoutButton';
import ExerciseList from '@/features/client/workout-session/components/ExerciseList';

export default function WorkOutPage() {
  const { id } = useParams();

  const { data:routine, isPending } = useMyRoutine(id as string);
  const exercises: RoutineExercise[] = routine?.exercises;
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const { exercisesLogs, initializeExercises, currentIndex, nextExercise, handleFinishSet, setCurrentIndex } = useWorkoutSession();

  const closeModal = () => {
    setIsVisibleModal(false)
  }

  const openModal = () => {
    setIsVisibleModal(true)
  }

  const changeCurrentExercise = (id: number) => {
    setCurrentIndex(id);
    closeModal();
  }

  useEffect(() => {
    if(!routine){
      return 
    }

    initializeExercises(exercises, routine.id)
  },[exercises, routine]); 

  if(isPending || !exercisesLogs || exercisesLogs.length === 0){
    return <div>Cargando...</div>
  }
  
  console.log(exercisesLogs);

  return (
    <div className='flex flex-col gap-6'>
      <WorkoutProgress exercises={exercisesLogs} openModal={openModal} />
      <WorkoutHeader exercises={exercisesLogs} currentExercise={exercisesLogs[currentIndex]} currentIndex={currentIndex} />
      <WorkoutInput exercise={exercisesLogs[currentIndex]} handleFinishSet={handleFinishSet}/>
      <WorkoutButton onClick={nextExercise} />
      <ExerciseList exercise={exercisesLogs} isOpen={isVisibleModal} onClose={closeModal} activeExerciseId={exercisesLogs[currentIndex].id} changeCurrentExercise={changeCurrentExercise} />
    </div>
  )
}
