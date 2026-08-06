"use client";

import { useMemo } from "react";

import { useClients } from "../../clients/hooks/use-clients";
import { useExercises } from "../../exercises/hooks/use-exercises";
import { useTemplates } from "../../templates/hooks/use-templates";
import type { Exercise } from "../../exercises/types/exercise.types";
import type { Template } from "../../templates/types/templates.type";

export function useAssignedRoutineCatalogs() {
  const { data: templatesData, isLoading: isLoadingTemplates } = useTemplates();
  const { data: exercisesData, isLoading: isLoadingExercises } = useExercises();
  const { data: clientsData, isLoading: isLoadingClients } = useClients();

  const templates = useMemo(() => templatesData ?? [], [templatesData]);
  const exercises = useMemo(() => exercisesData ?? [], [exercisesData]);
  const clients = useMemo(() => clientsData?.data ?? clientsData ?? [], [clientsData]);

  return {
    templates,
    exercises,
    clients,
    isLoadingTemplates,
    isLoadingExercises,
    isLoadingClients,
  } as const;
}

export type AssignedRoutineCatalogs = ReturnType<typeof useAssignedRoutineCatalogs>;
export type AssignedRoutineTemplate = Template;
export type AssignedRoutineExercise = Exercise;
