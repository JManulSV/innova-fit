import { z } from 'zod'

export const exerciseSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  description: z.string().optional(),
  instructions: z.string().optional(),
  body_parts_ids: z.array(z.number()).optional(),
})

export type ExerciseFormValues = z.infer<typeof exerciseSchema>
