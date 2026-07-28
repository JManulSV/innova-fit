import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Muted } from "@/components/typography";
import { ReactNode, useState } from "react";

interface ConfirmDialogProps {
  title?: string;
  description?: ReactNode;
  trigger: ReactNode;
  onConfirm: () => Promise<any> | void;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  icon?: ReactNode;
  defaultOpen?: boolean;
}

export default function ConfirmDialog({
  title = "Confirmar",
  description,
  trigger,
  onConfirm,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  isPending = false,
  icon,
  defaultOpen = false,
}: ConfirmDialogProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleConfirm = async () => {
    await onConfirm();
    setOpen(false);
  };

  const handleCancel = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="p-6">
        <DialogHeader>
          {icon && (
            <div className="flex justify-center items-center mb-2 p-2 bg-destructive/10 rounded-full w-12 h-12 mx-auto">
              {icon}
            </div>
          )}
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              <Muted>{description}</Muted>
            </DialogDescription>
          )}

          <div className="mt-4 flex flex-col justify-end gap-2">
            <Button 
              variant="destructive" 
              onClick={handleConfirm} 
              disabled={isPending}
              className="cursor-pointer"
            >
              {isPending ? "Procesando..." : confirmLabel}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleCancel}
              className="cursor-pointer"
            >
              {cancelLabel}
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
