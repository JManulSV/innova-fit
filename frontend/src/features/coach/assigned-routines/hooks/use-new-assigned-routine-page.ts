"use client";

import { useAssignedRoutineCatalogs } from "./use-assigned-routine-catalogs";
import { useAssignedRoutineClients } from "./use-assigned-routine-clients";
import { useAssignedRoutineSubmission } from "./use-assigned-routine-submission";
import { useAssignedRoutineWizard } from "./use-assigned-routine-wizard";
import type { NewAssignedRoutinePageVm } from "./use-new-assigned-routine-page.types";

interface UseNewAssignedRoutinePageOptions {
  onAssigned: () => void;
}

export function useNewAssignedRoutinePage({ onAssigned }: UseNewAssignedRoutinePageOptions): NewAssignedRoutinePageVm {
  const catalogs = useAssignedRoutineCatalogs();
  const wizard = useAssignedRoutineWizard({ templates: catalogs.templates });
  const clients = useAssignedRoutineClients({ clients: catalogs.clients, isLoadingClients: catalogs.isLoadingClients });
  const submission = useAssignedRoutineSubmission({
    selectedClientIds: clients.clients.selectedClientIds,
    selectedTemplateId: wizard.routine.selectedTemplateId,
    assignmentName: wizard.routine.assignmentName,
    routineNotes: wizard.routine.routineNotes,
    startDate: wizard.wizard.startDate,
    endDate: wizard.wizard.endDate,
    routineExercises: wizard.routine.routineExercises,
    onAssigned,
  });

  return {
    wizard: wizard.wizard,
    routine: wizard.routine,
    clients: clients.clients,
    catalogs: {
      templates: catalogs.templates,
      exercises: catalogs.exercises,
      isLoadingTemplates: catalogs.isLoadingTemplates,
      isLoadingExercises: catalogs.isLoadingExercises,
      isLoadingClients: catalogs.isLoadingClients,
    },
    dialogs: wizard.dialogs,
    submission: submission.submission,
    actions: {
      ...wizard.actions,
      ...clients.actions,
      ...submission.actions,
    },
  };
}
