"use client"

import { Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface AddExerciseCardProps {
  onClick?: () => void;
}

export default function AddExerciseCard({ onClick }: AddExerciseCardProps) {
  return (
    <Card
      className="group w-full cursor-pointer border border-dashed border-border bg-card/40 text-card-foreground transition-colors hover:border-primary hover:bg-card hover:text-primary hover:shadow-md"
      onClick={onClick}
    >
      <CardContent className="flex items-center justify-center">
        <div className="flex items-center gap-3 text-center">
          <Plus className="h-5 w-5 transition-colors group-hover:text-primary" />
          <div className="text-sm font-semibold transition-colors group-hover:text-primary">
            Agregar ejercicio
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
