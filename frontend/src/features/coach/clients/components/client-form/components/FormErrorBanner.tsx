import { AlertCircle } from "lucide-react";
import React from "react";

interface FormErrorBannerProps {
  error?: Error | null;
}

/**
 * FormErrorBanner - Muestra un banner de error general del formulario
 * Tipicamente usado para errores de la mutación o del servidor
 */
export const FormErrorBanner: React.FC<FormErrorBannerProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="mb-4 flex items-center gap-2 rounded-md border border-destructive bg-destructive/10 px-3 py-2 text-sm text-destructive">
      <AlertCircle className="h-4 w-4" />
      <span>{error.message || "No se pudo procesar la solicitud."}</span>
    </div>
  );
};
