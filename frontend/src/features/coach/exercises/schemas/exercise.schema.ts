import { z } from 'zod'

export const exerciseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  instructions: z.string().optional(),
  muscle_groups: z.array(z.string()).optional(),
})

export type ExerciseFormValues = z.infer<typeof exerciseSchema>
