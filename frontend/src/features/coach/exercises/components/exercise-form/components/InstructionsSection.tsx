import React from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Card } from '@/components/ui/card'
import { Mono } from '@/components/typography'
import { ExerciseFormValues } from '../../../schemas/exercise.schema'

interface Props {
  register: UseFormRegister<ExerciseFormValues>
  errors: any
}

export default function InstructionsSection({ register, errors }: Props) {
  return (
    <Card className="p-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium"><Mono className="text-muted-foreground">Instrucciones</Mono></label>
        <textarea
          {...register('instructions')}
          rows={6}
          className="w-full rounded-md border p-2 bg-transparent text-sm dark:bg-background"
          placeholder="Escribe las instrucciones del ejercicio."
        />
        {errors.instructions?.message && <p className="text-sm text-red-500">{String(errors.instructions.message)}</p>}
      </div>
    </Card>
  )
}
