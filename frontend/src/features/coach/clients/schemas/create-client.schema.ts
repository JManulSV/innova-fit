import { z } from "zod";

export const createClientSchema = z.object({
    name: z.string().trim().min(1, "El nombre completo es obligatorio"),
    email: z.string().trim().min(1, "El correo es obligatorio").email("Ingresa un correo válido."),
    // phone: z.string().min(1, "El teléfono es obligatorio"),
    password: z.string().trim().min(1, "La contraseña es obligatoria.").min(8, "La contraseña debe tener al menos 8 caracteres."),
    confirmPassword: z.string().trim().min(1, "La confirmación de la contraseña es obligatoria.")
})
.refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden.",
    path: ["confirmPassword"],
});

// Schema for editing: password fields are optional, but if provided must match and be >= 8 chars
export const editClientSchema = z
    .object({
        name: z.string().trim().min(1, "El nombre completo es obligatorio"),
        email: z.string().trim().min(1, "El correo es obligatorio").email("Ingresa un correo válido."),
        password: z.string().optional(),
        confirmPassword: z.string().optional(),
    })
    .superRefine((data, ctx) => {
        const pwd = data.password ?? "";
        const conf = data.confirmPassword ?? "";

        // If neither provided, OK
        if (!pwd && !conf) return;

        // If one provided, require both
        if (!pwd || !conf) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Ambas contraseñas deben proporcionarse para cambiar la contraseña.",
            });
            return;
        }

        if (pwd.trim().length < 8) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["password"],
                message: "La contraseña debe tener al menos 8 caracteres.",
            });
        }

        if (pwd !== conf) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["confirmPassword"],
                message: "Las contraseñas no coinciden.",
            });
        }
    });

export type CreateClientFormData = z.infer<typeof createClientSchema>;
export type EditClientFormData = z.infer<typeof editClientSchema>;