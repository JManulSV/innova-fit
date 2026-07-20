import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock, Eye, EyeOff, Wand2 } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { EditClientFormData } from "../../../schemas/create-client.schema";
import { FieldErrorMessage } from "./FieldErrorMessage";

interface CredentialsFieldsProps {
  register: UseFormRegister<EditClientFormData>;
  errors: FieldErrors<EditClientFormData>;
  isPending: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  onTogglePasswordVisibility: () => void;
  onToggleConfirmPasswordVisibility: () => void;
  onGeneratePassword: () => void;
  isEditMode?: boolean;
}

/**
 * CredentialsFields - Sección de credenciales del cliente
 * Incluye: contraseña, confirmar contraseña, toggle de visibilidad, generar contraseña
 */
export const CredentialsFields: React.FC<CredentialsFieldsProps> = ({
  register,
  errors,
  isPending,
  showPassword,
  showConfirmPassword,
  onTogglePasswordVisibility,
  onToggleConfirmPasswordVisibility,
  onGeneratePassword,
  isEditMode = false,
}) => {
  const [showSection, setShowSection] = useState(!isEditMode);

  const handleGenerate = () => {
    if (!showSection) setShowSection(true);
    onGeneratePassword();
  };

  if (isEditMode && !showSection) {
    return (
      <div>
        <Button type="button" variant="outline" onClick={() => setShowSection(true)}>
          Cambiar contraseña
        </Button>
        <p className="mt-2 text-sm text-muted-foreground">Dejar vacío para mantener la contraseña actual.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Contraseña */}
      <Field>
        <FieldLabel htmlFor="password">Contraseña</FieldLabel>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="password"
            disabled={isPending}
            {...register("password")}
            type={showPassword ? "text" : "password"}
            className={cn("pl-10 pr-10", errors.password && "border-red-500")}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            onClick={onTogglePasswordVisibility}
            aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <FieldErrorMessage message={errors.password?.message} />

        {/* Botón generar contraseña */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isPending}
          className="mt-2 flex gap-2 items-center cursor-pointer text-xs text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Wand2 className="h-4 w-4" />
          <span>Generar contraseña aleatoria</span>
        </button>
      </Field>

      {/* Confirmar Contraseña */}
      <Field>
        <FieldLabel htmlFor="confirmPassword">Confirmar Contraseña</FieldLabel>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            id="confirmPassword"
            disabled={isPending}
            {...register("confirmPassword")}
            type={showConfirmPassword ? "text" : "password"}
            className={cn(
              "pl-10 pr-10",
              errors.confirmPassword && "border-red-500"
            )}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
            onClick={onToggleConfirmPasswordVisibility}
            aria-label={
              showConfirmPassword
                ? "Ocultar contraseña"
                : "Mostrar contraseña"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <FieldErrorMessage message={errors.confirmPassword?.message} />
      </Field>
    </div>
  );
};
