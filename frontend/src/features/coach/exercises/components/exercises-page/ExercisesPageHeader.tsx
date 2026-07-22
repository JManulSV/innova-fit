import { H2, Text, Muted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ExercisesPageHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <H2>Ejercicios</H2>
        <Muted>Catálogo de ejercicios disponibles para armar rutinas</Muted>
      </div>
      <Link href="/coach/exercises/create">
        <Button className="cursor-pointer">
          <Plus className="h-4 w-4" />
          <span>Agregar ejercicio</span>
        </Button>
      </Link>
    </div>
  );
}