"use client";

import { useMemo, useState } from "react";

import type { Exercise } from "../../exercises/types/exercise.types";
import type { Template } from "../../templates/types/templates.type";
import { mapExerciseToRoutine, mapTemplateExerciseToRoutine } from "../pages/components/utils";
import type { RoutineExercise } from "../pages/components/types";
import type { RepeatMode, WizardStep } from "./types";

interface UseAssignedRoutineWizardParams {
  templates: Template[];
}

export function useAssignedRoutineWizard({ templates }: UseAssignedRoutineWizardParams) {
  const [step, setStep] = useState<WizardStep>(1);
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const [exercisePickerOpen, setExercisePickerOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<number | null>(null);
  const [assignmentName, setAssignmentName] = useState("");
  const [routineNotes, setRoutineNotes] = useState("");
  const [repeatMode, setRepeatMode] = useState<RepeatMode>("once");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10));
  const [routineExercises, setRoutineExercises] = useState<RoutineExercise[]>([]);

  const selectedTemplate = useMemo(
    () => templates.find((template) => template.id === selectedTemplateId) ?? null,
    [selectedTemplateId, templates],
  );

  const applyTemplate = (templateId: number) => {
    const template = templates.find((item) => item.id === templateId);

    if (!template) return;

    setSelectedTemplateId(template.id);
    setRoutineExercises((current) => {
      const manualExercises = current.filter((exercise) => exercise.source === "manual");
      const templateExercises = template.exercises.map((exercise, index) => mapTemplateExerciseToRoutine(exercise, index + 1, template.id));

      return [...manualExercises, ...templateExercises].map((exercise, index) => ({ ...exercise, exercise_order: index + 1 }));
    });
    setTemplatePickerOpen(false);
  };

  const clearTemplate = () => {
    setSelectedTemplateId(null);
    setRoutineExercises((current) => current.filter((exercise) => exercise.source === "manual").map((exercise, index) => ({ ...exercise, exercise_order: index + 1 })));
  };

  const addExercises = (pickedExercises: Exercise[]) => {
    setRoutineExercises((current) => {
      const next = [...current];

      pickedExercises.forEach((exercise) => {
        if (next.some((item) => item.exercise_id === exercise.id)) return;
        next.push(mapExerciseToRoutine(exercise, next.length + 1));
      });

      return next.map((exercise, index) => ({ ...exercise, exercise_order: index + 1 }));
    });
    setExercisePickerOpen(false);
  };

  const removeExercise = (exerciseId: number) => {
    setRoutineExercises((current) =>
      current
        .filter((exercise) => exercise.exercise_id !== exerciseId)
        .map((exercise, index) => ({ ...exercise, exercise_order: index + 1 })),
    );
  };

  const updateExercise = (
    exerciseId: number,
    field: keyof Pick<RoutineExercise, "sets" | "reps" | "rest_seconds">,
    value: number,
  ) => {
    setRoutineExercises((current) =>
      current.map((exercise) => (exercise.exercise_id === exerciseId ? { ...exercise, [field]: value } : exercise)),
    );
  };

  const handleContinue = () => {
    if (routineExercises.length === 0) return;
    setStep(2);
  };

  const handleBack = () => setStep(1);

  return {
    wizard: {
      step,
      repeatMode,
      startDate,
      endDate,
    },
    routine: {
      selectedTemplate,
      selectedTemplateId,
      assignmentName,
      routineNotes,
      routineExercises,
    },
    dialogs: {
      templatePickerOpen,
      exercisePickerOpen,
    },
    actions: {
      onStepChange: setStep,
      onOpenTemplatePicker: setTemplatePickerOpen,
      onOpenExercisePicker: setExercisePickerOpen,
      onSelectTemplate: applyTemplate,
      onClearTemplate: clearTemplate,
      onAddExercises: addExercises,
      onRemoveExercise: removeExercise,
      onUpdateExercise: updateExercise,
      onAssignmentNameChange: setAssignmentName,
      onRoutineNotesChange: setRoutineNotes,
      onRepeatModeChange: setRepeatMode,
      onStartDateChange: setStartDate,
      onEndDateChange: setEndDate,  
      onContinue: handleContinue,
      onBack: handleBack,
      onCloseTemplatePicker: () => setTemplatePickerOpen(false),
      onCloseExercisePicker: () => setExercisePickerOpen(false),
    },
  } as const;
}
