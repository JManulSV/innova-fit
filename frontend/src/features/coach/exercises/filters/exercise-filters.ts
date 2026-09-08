import { ExerciseFilters, exerciseFiltersSchema } from "./exercise-filters.schema";

type SearchParamsInput = {
  search?: string;
  body_parts?: string;
};

export function parseExerciseFilter(input: SearchParamsInput): ExerciseFilters {
  return exerciseFiltersSchema.parse({
    search: input.search ?? "",
    body_parts: input.body_parts ?? "all"
  });
}

export function serializeExerciseFilters(filters: ExerciseFilters): string {
  const params = new URLSearchParams();

  if(filters.search?.trim()){
    params.set("filter[search]", filters.search);
  }
  if(filters.body_parts && filters.body_parts !== "all"){
    params.set("filter[body_parts]", filters.body_parts);
  }

  return params.toString();
}
