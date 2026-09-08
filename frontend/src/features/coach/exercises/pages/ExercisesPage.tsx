"use client";

import { Container } from "@/components/design-system/container";
import { Stack } from "@/components/design-system/stack";
import { useDebounce } from "@/hooks/use-debounce";
import ExercisesPageHeader from "../components/exercises-page/ExercisesPageHeader";
import { useExercises } from "../hooks/use-exercises";
import ExercisesPageFilterBar from "../components/exercises-page/ExercisesPageFilterBar";
import ExercisesPageGrid from "../components/exercises-page/ExercisesPageGrid";
import ExercisesPageSkeleton from "../components/exercises-page/ExercisesPageSkeleton";
import { useExercisesFilters } from "../hooks/use-exercises-filters";
import { useBodyParts } from "../../body-parts/hooks/use-body-parts";

export default function ExercisesPage() {
  const { filters, setFilters } = useExercisesFilters();
  const debouncedSearch = useDebounce((filters.search ?? "").trim(), 300);
  const { data, isPending, isFetching } = useExercises({
    ...filters,
    search: debouncedSearch,
  });
  const { data: bodyParts } = useBodyParts();

  const exercises = data ?? [];
  const showInitialSkeleton = isPending && !data;
  const showRefreshingState = isFetching && !!data;

  return (
    <Container>
      <Stack>
        <ExercisesPageHeader />
        <div className="space-y-6">
          <ExercisesPageFilterBar filters={filters} setFilters={setFilters} bodyParts={bodyParts ?? []} />

          {showRefreshingState && (
            <div className="flex items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
              Actualizando ejercicios...
            </div>
          )}

          {showInitialSkeleton ? (
            <ExercisesPageSkeleton />
          ) : (
            <ExercisesPageGrid exercises={exercises} isLoading={false} />
          )}
        </div>
      </Stack>
    </Container>
  );
}
