"use client";

import { useMyRoutine } from '@/features/client/my-routine/hooks/use-get-my-routines';
import { RoutineExercise } from '@/features/client/my-routine/types';
import WorkoutHeader from '@/features/client/workout-session/components/WorkoutHeader';
import { useWorkoutSession } from '@/features/client/workout-session/hooks/use-workout-session';
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import WorkoutExerciseTable from '@/features/client/workout-session/components/WorkoutExerciseTable';
import NextExerciseButton from '@/features/client/workout-session/components/NextExerciseButton';
import WorkoutTopBar from '@/features/client/workout-session/components/WorkoutTopBar';
import ExerciseSelector from '@/features/client/workout-session/components/ExerciseSelector';

export default function WorkOutPage() {
  const { id } = useParams();

  const { data:routine, isPending } = useMyRoutine(id as string);
  const exercises: RoutineExercise[] = routine?.exercises;
  const [isVisibleModal, setIsVisibleModal] = useState<boolean>(false);

  const { exercisesLogs, initializeExercises, currentIndex, nextExercise, handleFinishSet, setCurrentIndex, currentExercise } = useWorkoutSession();

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
      <WorkoutTopBar exercises={exercisesLogs} openModal={openModal} />
      <WorkoutHeader exercises={exercisesLogs} currentExercise={currentExercise} currentIndex={currentIndex} />
      <WorkoutExerciseTable exercise={currentExercise} handleFinishSet={handleFinishSet}/>
      <NextExerciseButton onClick={nextExercise} />
      <ExerciseSelector exercise={exercisesLogs} isOpen={isVisibleModal} onClose={closeModal} activeExerciseId={currentExercise.id} changeCurrentExercise={changeCurrentExercise} />
    </div>
  )
}
