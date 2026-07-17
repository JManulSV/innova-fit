import { Card } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { useForm } from "react-hook-form";
import {
  CreateClientFormData,
  createClientSchema,
} from "../../schemas/create-client.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateClient } from "../../hooks/use-create-client";
import { useRouter } from "next/navigation";
import React from "react";
import { usePasswordField } from "./hooks/usePasswordField";
import { FormErrorBanner } from "./components/FormErrorBanner";
import { PersonalInfoFields } from "./components/PersonalInfoFields";
import { CredentialsFields } from "./components/CredentialsFields";
import { FormActions } from "./components/FormActions";

/**
 * AddClientForm - Componente principal del formulario de creación de cliente
 * Orquesta la lógica de formulario, validación y envío
 */
export default function AddClientForm() {
  const { register, handleSubmit, formState: { errors }, setValue } =
    useForm<CreateClientFormData>({
      resolver: zodResolver(createClientSchema),
    });

  const { mutateAsync, isPending, error } = useCreateClient();
  const router = useRouter();

  const passwordField = usePasswordField(setValue);

  const onSubmit = async (data: CreateClientFormData) => {
    const payload = {
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      password: data.password,
    };

    await mutateAsync(payload);
    router.push("/coach/clients");
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
          />

          {/* Acciones */}
          <FormActions isPending={isPending} />
        </FieldGroup>
      </form>
    </Card>
  );
}
