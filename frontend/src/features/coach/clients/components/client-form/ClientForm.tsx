"use client";

import { Card } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";

import { FormErrorBanner } from "./components/FormErrorBanner";
import { PersonalInfoFields } from "./components/PersonalInfoFields";
import { CredentialsFields } from "./components/CredentialsFields";
import { FormActions } from "./components/FormActions";
import { useClientForm } from "./hooks/useClientForm";

interface ClientFormProps {
  mode?: "create" | "edit";
  clientId?: string;
  initialValues?: {
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  };
  onSuccess?: (clientId?: string) => void;
}

export default function ClientForm({
  mode = "create",
  clientId,
  initialValues,
  onSuccess,
}: ClientFormProps) {
  const {
    register,
    errors,
    isPending,
    error,
    submitText,
    onSubmit,
    passwordField,
    mode: formMode,
  } = useClientForm({
    mode,
    clientId,
    initialValues,
    onSuccess,
  });

  return (
    <Card className="border-border/70 bg-card/95 p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8">
      <form onSubmit={onSubmit}>
        <FieldGroup className="space-y-6">
          <FormErrorBanner error={error} />

          <PersonalInfoFields
            register={register}
            errors={errors}
            isPending={isPending}
          />

          <CredentialsFields
            register={register}
            errors={errors}
            isPending={isPending}
            showPassword={passwordField.showPassword}
            showConfirmPassword={passwordField.showConfirmPassword}
            onTogglePasswordVisibility={passwordField.togglePasswordVisibility}
            onToggleConfirmPasswordVisibility={passwordField.toggleConfirmPasswordVisibility}
            onGeneratePassword={passwordField.handleGeneratePassword}
            isEditMode={formMode === "edit"}
          />

          <FormActions isPending={isPending} submitText={submitText} />
        </FieldGroup>
      </form>
    </Card>
  );
}
