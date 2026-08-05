"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Stack } from "@/components/design-system/stack";
import { Muted, Text } from "@/components/typography";
import ExercisePickerCard from "../ExercisePickerCard";

interface TemplateExercisesEmptyStateProps {
  onAddClick?: () => void;
}

export default function TemplateExercisesEmptyState({ onAddClick }: TemplateExercisesEmptyStateProps) {
  return (
    <Stack gap="4">
      <ExercisePickerCard onClick={onAddClick} />
      <Card className="border-dashed border-border bg-card text-card-foreground">
        <CardContent className="space-y-2 py-6">
          <Text className="text-base font-medium">Esta plantilla todavía no tiene ejercicios</Text>
          <Muted className="block text-sm">Cuando agregues ejercicios en la edición, la secuencia aparecerá aquí con el orden y las métricas por bloque.</Muted>
        </CardContent>
      </Card>
    </Stack>
  );
}
