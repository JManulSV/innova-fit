import { z } from "zod";

export const createClientSchema = z.object({
    firstName: z.string().trim().min(1, "El nombre es obligatorio"),
    lastName: z.string().trim().min(1, "El apellido es obligatorio"),
    email: z.string().trim().min(1, "El correo es obligatorio").email("Ingresa un correo válido."),
    // phone: z.string().min(1, "El teléfono es obligatorio"),
    password: z.string().trim().min(1, "La contraseña es obligatoria.").min(8, "La contraseña debe tener al menos 8 caracteres."),
    confirmPassword: z.string().trim().min(1, "La confirmación de la contraseña es obligatoria.")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});

export type CreateClientFormData = z.infer<typeof createClientSchema>;