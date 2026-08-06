"use client";

import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Template } from "../../../templates/types/templates.type";

interface Props {
  open: boolean;
  templates: Template[];
  selectedTemplateId: number | null;
  isLoading: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectTemplate: (templateId: number) => void;
}

export default function TemplatePickerDialog({ open, templates, selectedTemplateId, isLoading, onOpenChange, onSelectTemplate }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Elegir plantilla</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">Cargando plantillas...</div>
          ) : templates.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border px-4 py-10 text-center text-sm text-muted-foreground">No hay plantillas disponibles.</div>
          ) : (
            templates.map((template) => (
              <button key={template.id} type="button" onClick={() => onSelectTemplate(template.id)} className={`rounded-2xl border p-4 text-left transition-colors hover:bg-muted/30 ${selectedTemplateId === template.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{template.name}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{template.description}</p>
                  </div>
                  <Badge variant="secondary">{template.exercises?.length ?? 0} ejercicios</Badge>
                </div>
              </button>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
