import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Plus } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

interface FormActionsProps {
  isPending: boolean;
  submitText?: string;
  onCancel?: () => void;
}

/**
 * FormActions - Sección de acciones del formulario
 * Incluye: botón crear/actualizar, botón cancelar
 */
export const FormActions: React.FC<FormActionsProps> = ({
  isPending,
  submitText = "Crear Cliente",
  onCancel,
}) => {
  const router = useRouter();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      router.back();
    }
  };

  return (
    <Field
      orientation="horizontal"
      className="items-end justify-end border-t border-border/70 pt-6"
    >
      <Button className="flex" disabled={isPending} type="submit">
        <Plus className="h-4 w-4 mr-1" />
        {submitText}
      </Button>
      <Button
        type="button"
        variant="secondary"
        className="ml-2"
        disabled={isPending}
        onClick={handleCancel}
      >
        Cancelar
      </Button>
    </Field>
  );
};
