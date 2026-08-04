"use client"

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { templateFormSchema, type TemplateFormValues } from "@/features/coach/templates/schemas/template.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface TemplateCreateFormProps {
  defaultName?: string;
  defaultDescription?: string;
  onSubmit: (values: TemplateFormValues) => void | Promise<void>;
}

export type TemplateCreateFormHandle = {
  submit: () => void;
  reset: () => void;
}

const TemplateCreateForm = forwardRef<TemplateCreateFormHandle, TemplateCreateFormProps>(function TemplateCreateForm({ defaultName = "", defaultDescription = "", onSubmit }, ref) {
  const formRef = useRef<HTMLFormElement | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TemplateFormValues>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: {
      name: defaultName,
      description: defaultDescription,
    },
    mode: "onSubmit",
  });

  useEffect(() => {
    reset({
      name: defaultName,
      description: defaultDescription,
    });
  }, [defaultName, defaultDescription, reset]);

  useImperativeHandle(ref, () => ({
    submit: () => formRef.current?.requestSubmit(),
    reset: () => {
      reset({
        name: defaultName,
        description: defaultDescription,
      });
    }
  }));

  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardContent>
        <form 
          ref={formRef} 
          onSubmit={handleSubmit((values) => {
            onSubmit({
              name: values.name,
              description: values.description?.trim() ? values.description : null,
            });
          })} 
          className="space-y-4">
          
          <div>
            <label className="block text-sm font-medium mb-1">Nombre de la plantilla</label>
            <Input 
              {...register("name")}
              placeholder="Ej. Fuerza tren superior — Nivel intermedio" 
              className="dark:bg-background"
            />
            {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Descripción</label>
            <textarea 
              {...register("description")}
              placeholder="Describe el objetivo de esta plantilla..." 
              className="w-full min-h-24 rounded-lg border border-input px-2.5 py-2 text-sm dark:bg-background" />
            {errors.description && <p className="mt-1 text-sm text-destructive">{errors.description.message}</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
});

export default TemplateCreateForm;
