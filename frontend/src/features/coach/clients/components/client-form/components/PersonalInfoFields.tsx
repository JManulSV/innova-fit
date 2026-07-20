import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import React from "react";
import { EditClientFormData } from "../../../schemas/create-client.schema";
import { FieldErrorMessage } from "./FieldErrorMessage";

interface PersonalInfoFieldsProps {
  register: UseFormRegister<EditClientFormData>;
  errors: FieldErrors<EditClientFormData>;
  isPending: boolean;
}

/**
 * PersonalInfoFields - Sección de datos personales del cliente
 * Incluye: nombre, apellido, correo, teléfono
 */
export const PersonalInfoFields: React.FC<PersonalInfoFieldsProps> = ({
  register,
  errors,
  isPending,
}) => {
  return (
    <>
      {/* Nombre completo */}
      <div className="grid gap-4 md:grid-cols-1 mb-2">
        <Field>
          <FieldLabel htmlFor="name">Nombre completo</FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="name"
              placeholder="ej. Andres Manuel Lopez"
              disabled={isPending}
              {...register("name")}
              type="text"
              className={cn("pl-10", errors.name && "border-red-500")}
            />
          </div>
          <FieldErrorMessage message={errors.name?.message} />
        </Field>
      </div>

      {/* Correo y Teléfono */}
      <div className="grid gap-4 md:grid-cols-2 mb-2">
        <Field>
          <FieldLabel htmlFor="email">Correo Electrónico</FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="email"
              placeholder="ej. usuario@ejemplo.com"
              disabled={isPending}
              {...register("email")}
              type="email"
              className={cn("pl-10", errors.email && "border-red-500")}
            />
          </div>
          <FieldErrorMessage message={errors.email?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              id="phone"
              placeholder="ej. +52 1 234 567 8901"
              disabled
              type="tel"
              className={cn("pl-10")}
            />
          </div>
        </Field>
      </div>
    </>
  );
};
