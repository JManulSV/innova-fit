import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { User, Mail, Phone } from "lucide-react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { cn } from "@/lib/utils";
import React from "react";
import { CreateClientFormData } from "../../../schemas/create-client.schema";
import { FieldErrorMessage } from "./FieldErrorMessage";
import { Mono } from "@/components/typography";

interface PersonalInfoFieldsProps {
  register: UseFormRegister<CreateClientFormData>;
  errors: FieldErrors<CreateClientFormData>;
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
      {/* Nombre y Apellido */}
      <div className="grid gap-4 md:grid-cols-2 mb-2">
        <Field>
          <FieldLabel htmlFor="firstName"><Mono>Nombre</Mono></FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="firstName"
              placeholder="ej. Andres Manuel"
              disabled={isPending}
              {...register("firstName")}
              type="text"
              className={cn("pl-10", errors.firstName && "border-destructive")}
            />
          </div>
          <FieldErrorMessage message={errors.firstName?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="lastName"><Mono>Apellido</Mono></FieldLabel>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="lastName"
              placeholder="ej. López Obrador"
              disabled={isPending}
              {...register("lastName")}
              type="text"
              className={cn("pl-10", errors.lastName && "border-destructive")}
            />
          </div>
          <FieldErrorMessage message={errors.lastName?.message} />
        </Field>
      </div>

      {/* Correo y Teléfono */}
      <div className="grid gap-4 md:grid-cols-2 mb-2">
        <Field>
          <FieldLabel htmlFor="email"><Mono>Correo Electrónico</Mono></FieldLabel>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="email"
              placeholder="ej. usuario@ejemplo.com"
              disabled={isPending}
              {...register("email")}
              type="email"
              className={cn("pl-10", errors.email && "border-destructive")}
            />
          </div>
          <FieldErrorMessage message={errors.email?.message} />
        </Field>

        <Field>
          <FieldLabel htmlFor="phone"><Mono>Teléfono</Mono></FieldLabel>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="phone"
              placeholder="ej. +52 1 234 567 8901"
              disabled={isPending}
              type="tel"
              className={cn("pl-10")}
            />
          </div>
        </Field>
      </div>
    </>
  );
};
