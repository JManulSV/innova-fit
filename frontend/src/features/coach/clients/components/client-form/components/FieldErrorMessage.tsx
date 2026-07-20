import { AlertCircle } from "lucide-react";
import React from "react";

interface FieldErrorMessageProps {
  message?: string;
}

/**
 * FieldErrorMessage - Muestra un mensaje de error específico de un campo
 */
export const FieldErrorMessage: React.FC<FieldErrorMessageProps> = ({
  message,
}) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
      <AlertCircle className="h-3 w-3" />
      <span>{message}</span>
    </div>
  );
};
