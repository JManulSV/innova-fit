/**
 * DeleteExerciseDialog component is a confirmation dialog that prompts the user to confirm the deletion of an exercise.
 * It uses the `ConfirmDialog` component to separate the UI from the mutation logic.
 */

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Muted } from "@/components/typography";
import { useDeleteExercise } from "../../hooks/use-delete-exercise";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import type { ReactNode } from "react";
import { useRouter } from "next/navigation";


interface DeleteExerciseDialogProps {
  exerciseId?: number;
  buttonLabel?: "Eliminar" | "Eliminar ejercicio";
  linkRedirect?: string;
  trigger?: ReactNode;
}

function DeleteExerciseDialog({ exerciseId, buttonLabel = "Eliminar", linkRedirect, trigger }: DeleteExerciseDialogProps) {
  const { mutateAsync: deleteExercise, isPending } = useDeleteExercise();
  const router = useRouter();

  const defaultTrigger = (
    <Button variant="destructive" size={"lg"} className="cursor-pointer w-auto">
      <Trash className="inline-block h-4 w-4" aria-hidden="true" />
      {buttonLabel}
    </Button>
  );

  return (
    <ConfirmDialog
      title="Eliminar Ejercicio"
      description={<Muted>¿Estás seguro de que deseas eliminar este ejercicio? Esta acción no se puede deshacer.</Muted>}
      trigger={trigger ?? defaultTrigger}
      onConfirm={async () => {
        if (!exerciseId) return;
        await deleteExercise(exerciseId.toString());
        if (linkRedirect) router.replace(linkRedirect);
      }}
      confirmLabel="Eliminar"
      cancelLabel="Cancelar"
      isPending={isPending}
      icon={<Trash className="h-6 w-6 text-destructive" aria-hidden="true" />}
    />
  );
}

export default DeleteExerciseDialog;