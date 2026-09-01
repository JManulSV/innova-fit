import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import type { ExerciseLog } from "../types";
import { saveWorkoutSession } from "../services/save-workout-session";

interface SaveWorkoutVariables {
  assignedWorkoutId: number;
  logs: ExerciseLog[];
}

export function useSaveWorkoutSession() {
  const router = useRouter();

  return useMutation({
    mutationFn: ({ assignedWorkoutId, logs }: SaveWorkoutVariables) =>
      saveWorkoutSession(assignedWorkoutId, logs),
    onSuccess: () => {
      router.push("/client/workout");
    },
  });
}
