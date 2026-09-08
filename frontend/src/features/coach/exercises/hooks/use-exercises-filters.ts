import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { ExerciseFilters } from "../filters/exercise-filters.schema";
import { parseExerciseFilter, serializeExerciseFilters } from "../filters/exercise-filters";

export function useExercisesFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo<ExerciseFilters>(() => {
    return parseExerciseFilter({
        search: searchParams.get("filter[search]") ?? "",
        body_parts: searchParams.get("filter[body_parts]") ?? "all"
    });
  }, [searchParams]);

  const updateFilters = (next: Partial<ExerciseFilters>) => {
    const merge:ExerciseFilters = {
        ...filters,
        ...next
    };
    const query = serializeExerciseFilters(merge);
    router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };



  return { filters, setFilters: updateFilters };
}