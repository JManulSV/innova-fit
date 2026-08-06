import type { Client } from "../../../clients/types/clients.types";
import type { Exercise } from "../../../exercises/types/exercise.types";
import type { TemplateExercise } from "../../../templates/types/templates.type";
import type { ClientStatus, RoutineExercise } from "./types";

export function getClientInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function mapExerciseToRoutine(exercise: Exercise, order: number): RoutineExercise {
  return {
    exercise_id: exercise.id,
    name: exercise.name,
    muscle_groups: exercise.muscle_groups,
    sets: 3,
    reps: 10,
    rest_seconds: 60,
    exercise_order: order,
    source: "manual",
    templateId: null,
  };
}

export function mapTemplateExerciseToRoutine(exercise: TemplateExercise, order: number, templateId: number): RoutineExercise {
  return {
    exercise_id: exercise.id,
    name: exercise.name,
    muscle_groups: exercise.muscle_groups,
    sets: exercise.sets,
    reps: exercise.reps,
    rest_seconds: exercise.rest_seconds,
    exercise_order: order,
    source: "template",
    templateId,
  };
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

export function buildClientStatus(client: Client): ClientStatus {
  const daysSinceCreated = Math.max(0, Math.floor((Date.now() - new Date(client.created_at).getTime()) / 86_400_000));

  if (daysSinceCreated <= 7) {
    return { label: "Nuevo", tone: "bg-blue-500/10 text-blue-600" };
  }

  if (daysSinceCreated >= 90) {
    return { label: "Pausado", tone: "bg-amber-500/10 text-amber-600" };
  }

  return { label: "Activo", tone: "bg-emerald-500/10 text-emerald-600" };
}
