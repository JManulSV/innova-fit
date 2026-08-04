"use client";

import { useRouter } from "next/navigation";
import { FilePlus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { H1, Text } from "@/components/typography";

export default function TemplatesHeader() {
  const router = useRouter();

  return (
    <header className="flex flex-col gap-5 border-b border-border pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em]">
          <Sparkles className="size-3.5 text-muted-foreground" />
          <Text className="text-muted-foreground">Entrenamiento</Text>
        </div>

        <div className="space-y-2">
          <H1 className="text-foreground">Plantillas de ejercicio</H1>

          <Text className="max-w-2xl text-muted-foreground sm:text-base">
            Arma rutinas reutilizables y asígnalas a tus clientes en segundos.
          </Text>
        </div>
      </div>

      <Button onClick={() => router.push("/coach/templates/create")} className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
        <FilePlus className="size-4" />
        Nueva plantilla
      </Button>
    </header>
  );
}
