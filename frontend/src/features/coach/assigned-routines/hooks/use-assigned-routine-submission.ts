"use client";

import { useAssignedRoutine } from "./use-assigned-routines";
import type { AssignRoutineRequest } from "../types";
import type { RoutineExercise } from "../pages/components/types";

interface UseAssignedRoutineSubmissionParams {
  selectedClientIds: number[];
  selectedTemplateId: number | null;
  assignmentName: string;
  routineNotes: string;
  startDate: string;
  endDate: string;
  routineExercises: RoutineExercise[];
  onAssigned: () => void;
}

export function useAssignedRoutineSubmission({
  selectedClientIds,
  selectedTemplateId,
  assignmentName,
  routineNotes,
  startDate,
  endDate,
  routineExercises,
  onAssigned,
}: UseAssignedRoutineSubmissionParams) {
  const { mutateAsync: assignRoutine, isPending: isSubmitting } = useAssignedRoutine();

  const onAssign = async () => {
    if (selectedClientIds.length === 0 || routineExercises.length === 0) return;

    const payloadBase = {
      template_id: selectedTemplateId ?? undefined,
      name: assignmentName.trim() || "Rutina asignada",
      notes: routineNotes.trim() || undefined,
      start_date: startDate,
      end_date: endDate,
      exercises: routineExercises.map(({ source: _source, templateId: _templateId, ...exercise }) => exercise),
    } satisfies Omit<AssignRoutineRequest, "client_id">;

    await Promise.all(
      selectedClientIds.map((clientId) =>
        assignRoutine({
          id: clientId.toString(),
          data: {
            ...payloadBase,
            client_id: clientId.toString(),
          },
        }),
      ),
    );

    onAssigned();
  };

  return {
    submission: {
      isSubmitting,
    },
    actions: {
      onAssign,
      onCancel: onAssigned,
    },
  } as const;
}
