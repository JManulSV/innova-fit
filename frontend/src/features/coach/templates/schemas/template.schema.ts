import { z } from "zod";

export const workoutTemplateExerciseSchema = z.object({
  exercise_id: z.number().int().positive(),
  name: z.string().min(1),
  muscle_groups: z.array(z.string()).optional().nullable(),
  sets: z.number().int().min(1),
  reps: z.number().int().min(1),
  rest_seconds: z.number().int().min(0),
  exercise_order: z.number().int().min(0),
});

export const templateSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido"),
  description: z.string().trim().nullable().optional(),
  exercises: z.array(workoutTemplateExerciseSchema).min(1, "Agrega al menos un ejercicio"),
});

export const templateFormSchema = templateSchema.pick({
  name: true,
  description: true,
});

export type TemplateFormValues = z.infer<typeof templateFormSchema>;
export type TemplateRequestValues = z.infer<typeof templateSchema>;
