"use client";

import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";
import ExercisesPageHeader from "../components/exercises-page/ExercisesPageHeader";
import { useExercises } from "../hooks/use-exercises";
import ExercisesPageFilterBar from "../components/exercises-page/ExercisesPageFilterBar";
import ExercisesPageGrid from "../components/exercises-page/ExercisesPageGrid";
import ExercisesPageSkeleton from "../components/exercises-page/ExercisesPageSkeleton";

export default function ExercisesPage() {
  const { data, isPending } = useExercises();

  return (
    <Container>
      <Stack>
        {isPending ? (
          <ExercisesPageSkeleton />
        ) : (
          <>
            <ExercisesPageHeader />
            <div className="space-y-6">
              <ExercisesPageFilterBar />
              <ExercisesPageGrid exercises={data ?? []} isLoading={isPending} />
            </div>
          </>
        )}
      </Stack>
    </Container>
  );
}