"use client"

import { useState } from "react";
import { Page, PageHeader, PageTitle, PageDescription, PageTitleGroup } from "@/components/design-system/page";
import { Container } from "@/components/design-system/container";
import TemplateCreateForm, { TemplateCreateFormHandle } from "@/features/coach/templates/screens/create/components/TemplateCreateForm";
import AddExerciseModal from "@/features/coach/templates/components/AddExerciseModal";
import TemplateExercisesList from "@/features/coach/templates/screens/create/components/TemplateExercisesList";
import { useTemplateBuilder } from "@/features/coach/templates/hooks/useTemplateBuilder";
import { useExercises } from "@/features/coach/exercises/hooks/use-exercises";
import { useCreateTemplate } from "@/features/coach/templates/hooks/use-create-template";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { useRef } from "react";
import type { TemplateFormValues } from "@/features/coach/templates/schemas/template.schema";

export default function CreateTemplateScreen() {
  const { state: sidebarState } = useSidebar();
  const { selectedExercises, toggleExercise, deleteExercise, updateExerciseFields, resetExercises } = useTemplateBuilder();
  const { data: exercisesData, isLoading: isLoadingExercises } = useExercises();
  const exercisesList = exercisesData?.data || exercisesData || [];

  const [showAddModal, setShowAddModal] = useState(false);
  const [exerciseError, setExerciseError] = useState<string | null>(null);
  const formRef = useRef<TemplateCreateFormHandle | null>(null);

  const { mutateAsync: createTemplate, isPending: isCreating } = useCreateTemplate();

  const handleSaveTemplate = async ({ name, description }: TemplateFormValues) => {
    if (selectedExercises.length === 0) {
      setExerciseError("Agrega al menos un ejercicio antes de guardar la plantilla.");
      return;
    }

    setExerciseError(null);
    await createTemplate({ name, description: description ?? "", exercises: selectedExercises });
  };

  const handleCancel = () => {
    formRef.current?.reset();
    resetExercises();
    setExerciseError(null);
  };

  const floatingBarLeftClass = sidebarState === "collapsed"
    ? "md:left-[calc(var(--sidebar-width-icon)+1.5rem)]"
    : "md:left-[calc(var(--sidebar-width)+1.5rem)]";

  return (
    <Page>
      <Container className="py-6">
        <PageHeader>
          <PageTitleGroup>
            <PageTitle>Nueva plantilla de ejercicios</PageTitle>
            <PageDescription>Define el nombre, la descripción y los ejercicios que formarán parte de esta plantilla.</PageDescription>
          </PageTitleGroup>
        </PageHeader>

        <div className="mx-auto mt-6 grid w-full grid-cols-1 gap-6 pb-28">
          <div className="w-full">
            <TemplateCreateForm ref={formRef} onSubmit={handleSaveTemplate} />
          </div>

          <div className="w-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold">Ejercicios</h3>
              <div className="text-sm text-muted-foreground">{selectedExercises.length} ejercicios</div>
            </div>

            {exerciseError && (
              <div className="mb-3 rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                {exerciseError}
              </div>
            )}

            <TemplateExercisesList exercises={selectedExercises} onDelete={(id) => deleteExercise(id)} onUpdate={updateExerciseFields} onAddClick={() => setShowAddModal(true)} />
          </div>
        </div>

        {showAddModal && (
          <AddExerciseModal
            exercises={exercisesList}
            isLoading={isLoadingExercises}
            onClose={() => setShowAddModal(false)}
            onAdd={toggleExercise}
            selectedExerciseIds={selectedExercises.map((exercise) => exercise.exercise_id)}
          />
        )}
      </Container>

      <div className={`fixed bottom-6 left-4 right-4 z-50 sm:bottom-8 md:right-6 ${floatingBarLeftClass}`}>
        <div className="pointer-events-auto mx-auto flex w-full max-w-5xl items-center justify-end gap-3 rounded-2xl border border-border/60 bg-card/80 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
          <Button variant="outline" onClick={handleCancel}>Cancelar</Button>
          <Button onClick={() => formRef.current?.submit()} disabled={isCreating}>{isCreating ? "Guardando..." : "Guardar plantilla"}</Button>
        </div>
      </div>
    </Page>
  );
}
