"use client";

import { Container } from "@/components/design-system/container";
import { Stack } from "@/components/design-system/stack";
import ExercisesPageHeader from "../components/exercises-page/ExercisesPageHeader";
import { useExercises } from "../hooks/use-exercises";
import ExercisesPageFilterBar from "../components/exercises-page/ExercisesPageFilterBar";
import ExercisesPageGrid from "../components/exercises-page/ExercisesPageGrid";
import ExercisesPageSkeleton from "../components/exercises-page/ExercisesPageSkeleton";
import { useExercisesFilters } from "../hooks/use-exercises-filters";
import { useBodyParts } from "../../body-parts/hooks/use-body-parts";

export default function ExercisesPage() {
  const { filters, setFilters } = useExercisesFilters();
  const { data, isPending } = useExercises(filters);
  const { data: bodyParts, isPending: isBodyPartsPending, error: bodyPartsError } = useBodyParts();

  return (
    <Container>
      <Stack>
        {isPending ? (
          <ExercisesPageSkeleton />
        ) : (
          <>
            <ExercisesPageHeader />
            <div className="space-y-6">
              <ExercisesPageFilterBar filters={filters} setFilters={setFilters} bodyParts={bodyParts ?? []} />
              <ExercisesPageGrid exercises={data ?? []} isLoading={isPending} />
            </div>
          </>
        )}
      </Stack>
    </Container>
  );
}