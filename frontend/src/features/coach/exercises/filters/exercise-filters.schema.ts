import { z } from "zod";

export const exerciseFiltersSchema = z.object({
  search: z.string().optional(),
  body_parts: z.string().optional()
});

export type ExerciseFilters = z.infer<typeof exerciseFiltersSchema>;