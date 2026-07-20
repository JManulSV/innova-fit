import { Card } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import {
  CreateClientFormData,
  createClientSchema,
  editClientSchema,
  EditClientFormData,
} from "../../schemas/create-client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateClient } from "../../hooks/use-create-client";
import { useEditClient } from "../../hooks/use-edit-client";
import { useRouter } from "next/navigation";
import { useMemo, useEffect } from "react";
import { usePasswordField } from "./hooks/usePasswordField";
import { FormErrorBanner } from "./components/FormErrorBanner";
import { PersonalInfoFields } from "./components/PersonalInfoFields";
import { CredentialsFields } from "./components/CredentialsFields";
import { FormActions } from "./components/FormActions";

interface ClientFormProps {
  mode?: "create" | "edit";
  clientId?: string;
  initialValues?: CreateClientFormData;
  onSuccess?: (clientId?: string) => void;
}

/**
 * ClientForm - Componente reutilizable para crear y editar clientes
 * Orquesta la lógica de formulario, validación y envío
 *
 * @param mode - "create" (default) o "edit"
 * @param clientId - ID del cliente a editar (requerido si mode="edit")
 * @param initialValues - Valores iniciales del formulario
 * @param onSuccess - Callback de éxito personalizado
 */
export default function ClientForm({
  mode = "create",
  clientId,
  initialValues,
  onSuccess,
}: ClientFormProps) {
  const resolver: any =
    mode === "create" ? zodResolver(createClientSchema) : zodResolver(editClientSchema);

  const { register, handleSubmit, formState: { errors }, setValue, reset } =
    useForm<EditClientFormData>({
      resolver,
      defaultValues: initialValues,
    });

  // Reset form values when `initialValues` arrive asynchronously.
  useEffect(() => {
    if (initialValues) {
      // Keep password fields empty intentionally for security.
      reset({ ...initialValues, password: "", confirmPassword: "" });
    }
  }, [initialValues, reset]);

  const { mutateAsync: createMutation, isPending: isCreating, error: createError } =
    useCreateClient();
  const { mutateAsync: editMutation, isPending: isEditing, error: editError } =
    useEditClient();

  const isPending = isCreating || isEditing;
  const error = createError || editError;

  const router = useRouter();
  const passwordField = usePasswordField(setValue);

  const formTitle = useMemo(() => {
    return mode === "create" ? "Crear Cliente" : "Editar Cliente";
  }, [mode]);

  const submitButtonText = useMemo(() => {
    if (mode === "create") {
      return isPending ? "Creando..." : "Crear Cliente";
    }
    return isPending ? "Actualizando..." : "Actualizar Cliente";
  }, [mode, isPending]);

  const onSubmit = async (data: EditClientFormData) => {
    const payload: any = {
      name: data.name,
      email: data.email,
    };

    // Only include password if user provided one (non-empty)
    if (data.password && String(data.password).trim().length > 0) {
      payload.password = data.password;
    }

    try {
      if (mode === "create") {
        await createMutation(payload);
      } else if (mode === "edit" && clientId) {
        await editMutation({ id: clientId, data: payload });
      }

      // Callback personalizado o redirección por defecto
      if (onSuccess) {
        onSuccess(clientId);
      } else {
        router.push("/coach/clients");
      }
    } catch (error) {
      // El error se captura en `error` y se muestra en el banner
      console.error("Error al procesar cliente:", error);
    }
  };

  return (
    <Card className="border-border/70 bg-card/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-6">
          {/* Error Banner */}
          <FormErrorBanner error={error} />

          {/* Información Personal */}
          <PersonalInfoFields
            register={register}
            errors={errors}
            isPending={isPending}
          />

          {/* Credenciales */}
          <CredentialsFields
            register={register}
            errors={errors}
            isPending={isPending}
            showPassword={passwordField.showPassword}
            showConfirmPassword={passwordField.showConfirmPassword}
            onTogglePasswordVisibility={
              passwordField.togglePasswordVisibility
            }
            onToggleConfirmPasswordVisibility={
              passwordField.toggleConfirmPasswordVisibility
            }
            onGeneratePassword={passwordField.handleGeneratePassword}
            isEditMode={mode === 'edit'}
          />

          {/* Acciones */}
          <FormActions 
            isPending={isPending} 
            submitText={submitButtonText}
          />
        </FieldGroup>
      </form>
    </Card>
  );
}
