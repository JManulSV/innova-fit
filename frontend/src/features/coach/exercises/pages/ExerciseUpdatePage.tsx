"use client"

import { useParams, useRouter } from 'next/navigation'
import { Page } from '@/components/layout/page'
import { H2, Mono, Muted } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useExercise } from '../hooks/use-exercise'
import { Exercise } from '../types/exercise.types'
import ExerciseForm from '../components/exercise-form/ExerciseForm'
import ExerciseFormSkeleton from '../components/exercise-form/ExerciseFormSkeleton'
import ExerciseFormError from '../components/exercise-form/ExerciseFormError'

export default function ExerciseUpdatePage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const handleBack = () => router.push('/coach/exercises')

  const { data: exercise, isLoading, error } = useExercise(id) as { data: Exercise; isLoading: boolean; error: any }

  if (isLoading) {
    return <ExerciseFormSkeleton />
  }

  if (error) {
    return <ExerciseFormError error={error} onRetry={() => router.refresh()} />
  }
  return (
    <Page className="relative p-2 overflow-hidden">
      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <Button onClick={handleBack} variant={"ghost"} className="flex gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Mono className='text-sm'>Volver a ejercicios</Mono>
          </Button>
          <H2>Editar ejercicio</H2>
          <Muted className="max-w-xl text-base">Actualiza los detalles del ejercicio seleccionado.</Muted>
        </div>

        <ExerciseForm
          key={exercise?.id}
          type="edit"
            initialValues={
            exercise
              ? {
                  ...exercise,
                  instructions: exercise.instructions ?? undefined,
                  muscle_groups: exercise.muscle_groups ?? undefined,
                }
              : undefined
          }
            exerciseId={String(exercise?.id ?? id)}
        />
      </div>
    </Page>
  )
}
