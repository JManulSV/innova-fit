"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FilePlus } from "lucide-react";

import TemplateCard from "@/features/coach/templates/screens/list/components/TemplateCard";
import { Card, CardContent } from "@/components/ui/card";

import { Template } from "@/features/coach/templates/types/templates.type";

export default function TemplatesGrid({
  templates,
  onDelete,
}: {
  templates: Template[];
  onDelete: (id: number) => Promise<void>;
}) {
  const router = useRouter();

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard key={template.id} template={template} onDelete={onDelete} />
      ))}

      <Card
        role="button"
        tabIndex={0}
        onClick={() => router.push("/coach/templates/create")}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            router.push("/coach/templates/create");
          }
        }}
        className="group cursor-pointer border-dashed border-white/15 bg-[#0c1016] text-slate-100 transition-colors hover:border-violet-400/50 hover:bg-[#11151d]"
      >
        <CardContent className="flex min-h-73 flex-col items-center justify-center gap-4 text-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-dashed border-white/15 bg-white/5 text-slate-300 transition-colors group-hover:border-violet-400/50 group-hover:text-violet-200">
            <FilePlus className="size-6" />
          </div>
          <div className="space-y-1">
            <p className="font-medium text-white">Nueva plantilla</p>
            <p className="text-sm text-muted-foreground">Crea una rutina reutilizable desde cero.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
