"use client";

import { useMemo, useState } from "react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

import { useBodyParts } from "../../../body-parts/hooks/use-body-parts";

import type { Exercise } from "../../types/exercise.types";
import ExerciseSelectorFooter from "./ExerciseSelectorFooter";
import ExerciseSelectorHeader from "./ExerciseSelectorHeader";
import ExerciseSelectorList from "./ExerciseSelectorList";
import ExerciseSelectorSelectedPanel from "./ExerciseSelectorSelectedPanel";
import ExerciseSelectorSidebar from "./ExerciseSelectorSidebar";
import { BodyPart } from "@/features/coach/body-parts/types/body-parts";

type ExerciseSelectorProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  exercises: Exercise[];
  selectedExerciseIds?: number[];
  isLoading?: boolean;
  title?: string;
  description?: string;
  onAdd?: (exercise: Exercise) => void;
  onRemove?: (exerciseId: number) => void;
  onCancel?: () => void;
};

export default function ExerciseSelector({
  open,
  onOpenChange,
  exercises,
  selectedExerciseIds = [],
  isLoading = false,
  title = "Seleccionar ejercicios",
  description = "Selecciona uno o varios ejercicios para continuar.",
  onAdd,
  onRemove,
  onCancel,
}: ExerciseSelectorProps) {
  const isMobile = useIsMobile();
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("Todos");
  const { data: bodyParts = [] } = useBodyParts();

  const bodyPartFilters = useMemo(
    () => ["Todos", ...bodyParts.map((bodyPart:BodyPart) => bodyPart.name)],
    [bodyParts],
  );

  const filteredExercises = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return exercises.filter((exercise) => {
      if (activeFilter !== "Todos") {
        const matchesFilter = (exercise.body_parts ?? []).some((part) => part.name.toLowerCase() === activeFilter.toLowerCase());

        if (!matchesFilter) return false;
      }

      if (!normalizedQuery) return true;

      return exercise.name.toLowerCase().includes(normalizedQuery) || exercise.description.toLowerCase().includes(normalizedQuery);
    });
  }, [activeFilter, exercises, query]);

  const selectedExercises = useMemo(
    () => exercises.filter((exercise) => selectedExerciseIds.includes(exercise.id)),
    [exercises, selectedExerciseIds],
  );

  const handleToggleExercise = (exercise: Exercise) => {
    if (selectedExerciseIds.includes(exercise.id)) {
      onRemove?.(exercise.id);
      return;
    }

    onAdd?.(exercise);
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const selectedCount = selectedExercises.length;

  const content = (
    <div className="flex h-full flex-col">
      <ExerciseSelectorHeader title={title} description={description} onClose={handleClose} />

      <div className="flex min-h-0 flex-1 flex-col gap-3 px-4 py-3 overflow-hidden lg:px-4 lg:py-3">
        <ExerciseSelectorSidebar
          query={query}
          onQueryChange={setQuery}
          activeFilter={activeFilter}
          filters={bodyPartFilters}
          onFilterChange={setActiveFilter}
        />

        <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
          <ExerciseSelectorList
            exercises={filteredExercises}
            isLoading={isLoading}
            selectedExerciseIds={selectedExerciseIds}
            onToggleExercise={handleToggleExercise}
          />

          <ExerciseSelectorSelectedPanel exercises={selectedExercises} onRemove={onRemove} />
        </div>
      </div>

      <ExerciseSelectorFooter selectedCount={selectedCount} onCancel={handleCancel} onConfirm={() => onOpenChange(false)} />
    </div>
  );

  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[96dvh] w-full rounded-t-3xl border-t p-0 sm:max-w-none" showCloseButton={false}>
          {content}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="h-[86dvh] max-h-[86dvh] w-[min(99vw,120rem)] max-w-none overflow-hidden p-0" showCloseButton={false}>
        {content}
      </DialogContent>
    </Dialog>
  );
}
