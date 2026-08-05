import ConfirmDialog from "@/components/confirm/ConfirmDialog";
import { Button } from "@/components/ui/button";
import { useDeleteTemplate } from "@/features/coach/templates/hooks/use-delete-template";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface DeleteTemplateDialogProps {
  templateId?: number;
  buttonLabel?: "Eliminar" | "Eliminar ejercicio";
  linkRedirect?: string;
  trigger?: ReactNode;
}

function DeleteTemplateDialog({ templateId, buttonLabel, linkRedirect, trigger }: DeleteTemplateDialogProps) {
    const {mutateAsync: deleteTemplate, isPending} = useDeleteTemplate();
    const router = useRouter();
    const defaultTrigger = (
        <Button
            variant="destructive"
            size={"lg"}
            className="cursor-pointer w-auto"
        >
            <Trash className="size-4" aria-hidden="true" />
            {buttonLabel}
        </Button>
    );

    const handleConfirm = async () => {
        if(!templateId) return;
        await deleteTemplate(templateId.toString());
        if(linkRedirect) router.replace(linkRedirect);
    }

    return (
        <ConfirmDialog
            title="Eliminar plantilla de rutina"
            description="¿Estás seguro de que deseas eliminar esta plantilla de rutina? Esta acción no se puede deshacer."
            trigger={trigger ?? defaultTrigger}
            onConfirm={async () => { await handleConfirm() }}
            confirmLabel="Eliminar"
            cancelLabel="Cancelar"
            isPending={isPending}
            icon={<Trash className="h-6 w-6 text-destructive" aria-hidden="true" />}
        />
  )
}

export default DeleteTemplateDialog