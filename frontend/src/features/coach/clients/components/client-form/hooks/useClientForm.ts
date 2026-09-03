"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { useRouter } from "next/navigation";

import {
  createClientSchema,
  editClientSchema,
  type EditClientFormData,
} from "../../../schemas/create-client.schema";
import { useCreateClient } from "../../../hooks/use-create-client";
import { useEditClient } from "../../../hooks/use-edit-client";
import type { CreateClientRequest, EditClientRequest } from "../../../types/clients.types";
import { usePasswordField } from "./usePasswordField";

type ClientFormMode = "create" | "edit";

type UseClientFormProps = {
  mode?: ClientFormMode;
  clientId?: string;
  initialValues?: Partial<EditClientFormData>;
  onSuccess?: (clientId?: string) => void;
};

export function useClientForm({
  mode = "create",
  clientId,
  initialValues,
  onSuccess,
}: UseClientFormProps) {
  const router = useRouter();
  const createMutation = useCreateClient();
  const editMutation = useEditClient();

  const form = useForm<EditClientFormData>({
    resolver: (mode === "create"
      ? zodResolver(createClientSchema)
      : zodResolver(editClientSchema)) as Resolver<EditClientFormData>,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      ...initialValues,
    },
  });

  const { register, handleSubmit, formState: { errors }, setValue, reset } = form;
  const passwordField = usePasswordField(setValue);

  useEffect(() => {
    if (!initialValues) return;

    reset({
      name: initialValues.name ?? "",
      email: initialValues.email ?? "",
      password: "",
      confirmPassword: "",
    });
  }, [initialValues, reset]);

  const isPending = createMutation.isPending || editMutation.isPending;
  const error = createMutation.error || editMutation.error;
  const submitText =
    mode === "create"
      ? isPending
        ? "Creando..."
        : "Crear Cliente"
      : isPending
        ? "Actualizando..."
        : "Actualizar Cliente";

  const onSubmit = handleSubmit(async (data) => {
    const basePayload = {
      name: data.name,
      email: data.email,
    };

    try {
      if (mode === "create") {
        const payload: CreateClientRequest = {
          ...basePayload,
          password: data.password ?? "",
        };

        await createMutation.mutateAsync(payload);
      } else {
        if (!clientId) return;

        const payload: EditClientRequest = {
          ...basePayload,
          ...(data.password?.trim() ? { password: data.password } : {}),
        };

        await editMutation.mutateAsync({ id: clientId, data: payload });
      }

      if (onSuccess) {
        onSuccess(clientId);
      } else {
        router.push("/coach/clients");
      }
    } catch (submitError) {
      console.error("Error al procesar cliente:", submitError);
    }
  });

  return {
    register,
    errors,
    isPending,
    error,
    submitText,
    onSubmit,
    passwordField,
    mode,
  };
}
