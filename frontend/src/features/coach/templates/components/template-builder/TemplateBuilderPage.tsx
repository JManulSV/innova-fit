"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Container } from "@/components/design-system/container";
import { Page, PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";
import { Stack } from "@/components/design-system/stack";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useExercises } from "@/features/coach/exercises/hooks/use-exercises";
import { useTemplateBuilder } from "@/features/coach/templates/hooks/useTemplateBuilder";
import type { TemplateFormValues } from "@/features/coach/templates/schemas/template.schema";
import type { WorkoutTemplateExercise } from "@/features/coach/templates/types/templates.type";
import TemplateForm, { TemplateFormHandle } from "./TemplateForm";
import TemplateExercisesList from "./TemplateExercisesList";
import ExercisePickerModal from "./ExercisePickerModal";

interface TemplateBuilderPageProps {
  title: string;
  description: string;
  submitLabel: string;
  submittingLabel: string;
  defaultName?: string;
  defaultDescription?: string;
  initialExercises?: WorkoutTemplateExercise[];
  isSubmitting: boolean;
  onSubmit: (values: TemplateFormValues, exercises: WorkoutTemplateExercise[]) => void | Promise<void>;
  onCancel?: () => void;
}

export default function TemplateBuilderPage({
  title,
  description,
  submitLabel,
  submittingLabel,
  defaultName = "",
  defaultDescription = "",
  initialExercises = [],
  isSubmitting,
  onSubmit,
  onCancel,
}: TemplateBuilderPageProps) {
  const { state: sidebarState } = useSidebar();
  const { selectedExercises, toggleExercise, deleteExercise, updateExerciseFields, initializeExercises, resetExercises } = useTemplateBuilder();
  const { data: exercisesData, isLoading: isLoadingExercises } = useExercises();
  const exercisesList = exercisesData?.data || exercisesData || [];

  const [showAddModal, setShowAddModal] = useState(false);
  const [exerciseError, setExerciseError] = useState<string | null>(null);
  const formRef = useRef<TemplateFormHandle | null>(null);
  const hasInitializedExercises = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (initialExercises.length > 0 && !hasInitializedExercises.current) {
      initializeExercises(initialExercises);
      hasInitializedExercises.current = true;
    }
  }, [initialExercises, initializeExercises]);

  const handleSaveTemplate = async (values: TemplateFormValues) => {
    if (selectedExercises.length === 0) {
      setExerciseError("Agrega al menos un ejercicio antes de guardar la plantilla.");
      return;
    }

    setExerciseError(null);
    try {
      await onSubmit(values, selectedExercises);
      router.push("/coach/templates");
    } catch (err) {
      // leave error handling to parent; log for debugging
      // do not navigate on failure
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();

    if (initialExercises.length > 0) {
      initializeExercises(initialExercises);
    } else {
      resetExercises();
    }

    setExerciseError(null);
    onCancel?.();
  };

  const floatingBarLeftClass = sidebarState === "collapsed"
    ? "md:left-[calc(var(--sidebar-width-icon)+1.5rem)]"
    : "md:left-[calc(var(--sidebar-width)+1.5rem)]";

  return (
    <Page>
      <Container className="py-6">
        <PageHeader>
          <PageTitleGroup>
            <PageTitle>{title}</PageTitle>
            <PageDescription>{description}</PageDescription>
          </PageTitleGroup>
        </PageHeader>

        <Stack gap="6" className="mt-6 pb-28">
          <div>
            <TemplateForm ref={formRef} defaultName={defaultName} defaultDescription={defaultDescription} onSubmit={handleSaveTemplate} />
          </div>

          <section>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">Ejercicios</h3>
              <div className="text-sm text-muted-foreground">{selectedExercises.length} ejercicios</div>
            </div>

            {exerciseError && (
              <div className="mb-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {exerciseError}
              </div>
            )}

            <TemplateExercisesList
              exercises={selectedExercises}
              onDelete={deleteExercise}
              onUpdate={updateExerciseFields}
              onAddClick={() => setShowAddModal(true)}
            />
          </section>
        </Stack>

        {showAddModal && (
          <ExercisePickerModal
            exercises={exercisesList}
            isLoading={isLoadingExercises}
            onClose={() => setShowAddModal(false)}
            onAdd={toggleExercise}
            onRemove={deleteExercise}
            selectedExerciseIds={selectedExercises.map((exercise) => exercise.exercise_id)}
          />
        )}
      </Container>

      <div className={`fixed bottom-6 left-4 right-4 z-50 sm:bottom-8 md:right-6 ${floatingBarLeftClass}`}>
        <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-end gap-3 rounded-2xl border border-border/60 bg-card/80 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-xl supports-backdrop-filter:bg-card/70">
          <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
          <Button onClick={() => formRef.current?.submit()} disabled={isSubmitting}>{isSubmitting ? submittingLabel : submitLabel}</Button>
        </div>
      </div>
    </Page>
  );
}
