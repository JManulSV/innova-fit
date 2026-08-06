import { H2, Muted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ExercisesPageHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <H2>Ejercicios</H2>
        <Muted>Catálogo de ejercicios disponibles para armar rutinas</Muted>
      </div>
      <Link href="/coach/exercises/create" className="sm:self-start">
        <Button className="w-full cursor-pointer sm:w-auto">
          <Plus className="h-4 w-4" />
          <span>Agregar ejercicio</span>
        </Button>
      </Link>
    </div>
  );
}
