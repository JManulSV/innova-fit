"use client";

import { useState } from "react";

import { Stack } from "@/components/design-system/stack";
import type { WorkoutTemplateExercise } from "@/features/coach/templates/types/templates.type";
import ExercisePickerCard from "./ExercisePickerCard";
import TemplateExercisesEmptyState from "./template-exercises-list/TemplateExercisesEmptyState";
import TemplateExerciseCard from "./template-exercises-list/TemplateExerciseCard";

interface TemplateExercisesListProps {
  exercises: WorkoutTemplateExercise[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, exercise: WorkoutTemplateExercise) => void;
  onAddClick?: () => void;
}

export default function TemplateExercisesList({ exercises, onDelete, onUpdate, onAddClick }: TemplateExercisesListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [draft, setDraft] = useState<WorkoutTemplateExercise | null>(null);

  const handleStartEdit = (exercise: WorkoutTemplateExercise) => {
    setEditingId(exercise.exercise_id);
    setDraft(exercise);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setDraft(null);
  };

  const handleSaveEdit = () => {
    if (!draft) return;

    onUpdate(draft.exercise_id, draft);
    setEditingId(null);
    setDraft(null);
  };

  if (!exercises || exercises.length === 0) {
    return <TemplateExercisesEmptyState onAddClick={onAddClick} />;
  }

  return (
    <section>
      <Stack gap="4">
        {exercises.map((exercise, index) => (
          <TemplateExerciseCard
            key={exercise.exercise_id}
            exercise={exercise}
            index={index}
            isEditing={editingId === exercise.exercise_id}
            draft={draft}
            onStartEdit={() => handleStartEdit(exercise)}
            onCancelEdit={handleCancelEdit}
            onSaveEdit={handleSaveEdit}
            onDelete={() => onDelete(exercise.exercise_id)}
            onDraftChange={setDraft}
          />
        ))}

        <div>
          <ExercisePickerCard onClick={onAddClick} />
        </div>
      </Stack>
    </section>
  );
}
