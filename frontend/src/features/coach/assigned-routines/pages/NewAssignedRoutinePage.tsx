"use client";

import { useRouter } from "next/navigation";

import NewAssignedRoutineView from "./components/NewAssignedRoutineView";
import { useNewAssignedRoutinePage } from "../hooks/use-new-assigned-routine-page";

export default function NewAssignedRoutinePage() {
  const router = useRouter();
  const vm = useNewAssignedRoutinePage({ onAssigned: () => router.push("/coach/templates") });

  return (
    <NewAssignedRoutineView vm={vm} />
  );
}
