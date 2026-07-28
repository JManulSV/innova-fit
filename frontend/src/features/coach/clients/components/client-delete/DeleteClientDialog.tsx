import { useDeleteClient } from "../../hooks/use-delete-client";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Muted } from "@/components/typography";
import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { useRouter } from "next/navigation";

/**
 * DeleteClientDialog - Diálogo de confirmación para eliminar un cliente
 * Reutiliza `ConfirmDialog` para separar UI y lógica de mutación.
 */

interface DeleteClientDialogProps {
  clientId?: number;
  buttonLabel?: "Eliminar" | "Eliminar cliente";
  linkRedirect?: string;
}

function DeleteClientDialog({ clientId, buttonLabel = "Eliminar", linkRedirect }: DeleteClientDialogProps) {
  const { mutateAsync: deleteClient, isPending } = useDeleteClient(clientId?.toString() || "");
  const router = useRouter();

  const trigger = (
    <Button variant="destructive" className="cursor-pointer">
      <Trash className="inline-block  h-4 w-4" aria-hidden="true" />
      {buttonLabel}
    </Button>
  );

  return (
    <ConfirmDialog
      title="Eliminar Cliente"
      description={<Muted>¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.</Muted>}
      trigger={trigger}
      onConfirm={async () => {
        if (!clientId) return;
        await deleteClient();
        if (linkRedirect) router.replace(linkRedirect);
      }}
      confirmLabel="Eliminar"
      cancelLabel="Cancelar"
      isPending={isPending}
      icon={<Trash className="h-6 w-6 text-destructive" aria-hidden="true" />}
    />
  );
}

export default DeleteClientDialog;