"use client";

import { useParams } from "next/navigation";
import WorkoutSessionPage from "@/features/client/workout-session/page";

export default function WorkOutPage() {
  const params = useParams<{ id: string | string[] }>();
  const rawId = params?.id;
  const routineId = Array.isArray(rawId) ? rawId[0] : rawId;

  if (!routineId) {
    return <div>No se pudo resolver la rutina.</div>;
  }

  return <WorkoutSessionPage routineId={routineId} />;
}
