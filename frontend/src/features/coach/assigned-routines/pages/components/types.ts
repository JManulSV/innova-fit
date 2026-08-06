import type { Client } from "../../../clients/types/clients.types";
import type { Exercise } from "../../../exercises/types/exercise.types";
import type { Template, WorkoutTemplateExercise } from "../../../templates/types/templates.type";

export type WizardStep = 1 | 2;
export type ClientFilter = "all" | "active" | "new" | "paused";
export type RepeatMode = "once" | "weekly" | "custom";

export type ClientStatus = {
  label: string;
  tone: string;
};

export type ClientItem = {
  client: Client;
  status: ClientStatus;
};

export type RoutineExercise = WorkoutTemplateExercise & {
  source: "template" | "manual";
  templateId: number | null;
};
export type RoutineTemplate = Template;
export type RoutineExerciseSource = Exercise;
