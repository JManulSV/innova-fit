"use client";

import { FilePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Text, Muted } from "@/components/typography";

export default function EmptyTemplates() {
  const router = useRouter();

  return (
    <Card className="border-dashed border-border bg-card text-card-foreground">
      <CardContent className="flex min-h-70 flex-col items-center justify-center gap-4 py-10 text-center">
        <div className="flex size-14 items-center justify-center rounded-full border border-border bg-popover/5 text-muted-foreground">
          <FilePlus className="size-6" />
        </div>

        <div className="space-y-1">
          <Text className="text-lg font-semibold text-card-foreground">No hay plantillas</Text>
          <Muted className="max-w-md text-sm">Crea tu primera plantilla para reutilizar rutinas y acelerar la prescripción.</Muted>
        </div>

        <Button onClick={() => router.push("/coach/templates/create")} className="bg-primary text-primary-foreground hover:bg-primary/90">
          <FilePlus className="size-4" />
          Nueva plantilla
        </Button>
      </CardContent>
    </Card>
  );
}
