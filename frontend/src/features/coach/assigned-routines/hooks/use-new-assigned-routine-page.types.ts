import type { Exercise } from "../../exercises/types/exercise.types";
import type { Template } from "../../templates/types/templates.type";
import type { ClientItem, ClientFilter, RepeatMode, WizardStep } from "./types";
import type { RoutineExercise } from "../pages/components/types";

export type NewAssignedRoutinePageVm = {
  wizard: {
    step: WizardStep;
    repeatMode: RepeatMode;
    startDate: string;
    endDate: string;
  };
  routine: {
    selectedTemplate: Template | null;
    selectedTemplateId: number | null;
    assignmentName: string;
    routineNotes: string;
    routineExercises: RoutineExercise[];
  };
  clients: {
    selectedClientIds: number[];
    clientFilter: ClientFilter;
    clientSearch: string;
    clientItems: ClientItem[];
  };
  catalogs: {
    templates: Template[];
    exercises: Exercise[];
    isLoadingTemplates: boolean;
    isLoadingExercises: boolean;
    isLoadingClients: boolean;
  };
  dialogs: {
    templatePickerOpen: boolean;
    exercisePickerOpen: boolean;
  };
  submission: {
    isSubmitting: boolean;
  };
  actions: {
    onStepChange: (step: WizardStep) => void;
    onOpenTemplatePicker: (open: boolean) => void;
    onOpenExercisePicker: (open: boolean) => void;
    onSelectTemplate: (templateId: number) => void;
    onClearTemplate: () => void;
    onAddExercises: (exercises: Exercise[]) => void;
    onRemoveExercise: (exerciseId: number) => void;
    onUpdateExercise: (exerciseId: number, field: keyof Pick<RoutineExercise, "sets" | "reps" | "rest_seconds">, value: number) => void;
    onClientToggle: (clientId: number) => void;
    onClientFilterChange: (filter: ClientFilter) => void;
    onClientSearchChange: (value: string) => void;
    onAssignmentNameChange: (value: string) => void;
    onRoutineNotesChange: (value: string) => void;
    onRepeatModeChange: (value: RepeatMode) => void;
    onStartDateChange: (value: string) => void;
    onEndDateChange: (value: string) => void;
    onContinue: () => void;
    onBack: () => void;
    onAssign: () => Promise<void>;
    onCancel: () => void;
    onCloseTemplatePicker: () => void;
    onCloseExercisePicker: () => void;
  };
};
