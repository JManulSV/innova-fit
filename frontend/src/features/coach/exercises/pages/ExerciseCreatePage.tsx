"use client"

import { Page } from '@/components/layout/page'
import { H2, Mono, Muted } from '@/components/typography'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import ExerciseForm from '@/features/coach/exercises/components/exercise-form/ExerciseForm'
export default function ExerciseCreatePage() {
  
    const router = useRouter();
    const handleBack = () => {
        router.push('/coach/exercises')
    }

    return (
    <Page className="relative p-2 overflow-hidden">

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <Button onClick={handleBack} variant={'ghost'}  className="flex gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Mono className='text-sm'>Volver a ejercicios</Mono>
          </Button>
          <H2>Agregar ejercicio</H2>
          <Muted className="max-w-xl text-base">
            Crea un nuevo ejercicio con sus detalles principales.
          </Muted>
        </div>
        <ExerciseForm />
      </div>
    </Page>
  )
}
