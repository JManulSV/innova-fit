import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useDeleteClient } from "../../hooks/use-delete-client";
import { Client } from "../../types/clients.types";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { Muted } from "@/components/typography";
import { useState } from "react";

/**
 * DeleteClientDialog - Diálogo de confirmación para eliminar un cliente
 * Incluye: mensaje de confirmación, botones de cancelar y confirmar
 */

interface DeleteClientDialogProps {
  clientId?: number;
  buttonLabel?: "Eliminar" | "Eliminar-cliente";
} 


function DeleteClientDialog({ clientId, buttonLabel = "Eliminar" }: DeleteClientDialogProps) {
    const { mutateAsync: deleteClient, isPending } = useDeleteClient(clientId?.toString() || "");
    const [open, setOpen] = useState(false);

    const handleDelete = async () => {
        if (!clientId) return;
        await deleteClient();
        setOpen(false);
    }

    const handleCancel = () => {
        setOpen(false);
    }

    return(
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" className="cursor-pointer">
            <Trash className="inline-block  h-4 w-4" aria-hidden="true" />
            { buttonLabel }
          </Button>
        </DialogTrigger>
        <DialogContent className="p-6">
          <DialogHeader>
            <div className="flex justify-center items-center mb-2 p-2 bg-destructive/10 rounded-full w-12 h-12 mx-auto">
              <Trash className="h-6 w-6 text-destructive" aria-hidden="true" />
            </div>
            <DialogTitle className="text-center">Eliminar Cliente</DialogTitle>
            <DialogDescription className="text-center">
              <Muted>¿Estás seguro de que deseas eliminar este cliente? Esta acción no se puede deshacer.</Muted>
            </DialogDescription>
            <div className="mt-4 flex flex-col justify-end gap-2">
              <Button variant="destructive" onClick={handleDelete} disabled={isPending}>
                { isPending ? "Eliminando..." : "Eliminar"}
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancelar
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
}

export default DeleteClientDialog