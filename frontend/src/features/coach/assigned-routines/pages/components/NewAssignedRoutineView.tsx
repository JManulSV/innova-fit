"use client";

import { Page } from "@/components/design-system/page";
import { Container } from "@/components/design-system/container";
import { Stack } from "@/components/design-system/stack";
import NewAssignedRoutineHeader from "./NewAssignedRoutineHeader";
import RoutineStepContent from "./RoutineStepContent";
import RoutineSummarySidebar from "./RoutineSummarySidebar";
import AssignmentFooter from "./AssignmentFooter";
import TemplatePickerDialog from "./TemplatePickerDialog";
import ExercisePickerDialog from "./ExercisePickerDialog";
import { NewAssignedRoutinePageVm } from "../../hooks/use-new-assigned-routine-page.types";


interface NewAssignedRoutineViewProps {
  vm: NewAssignedRoutinePageVm;
}

export default function NewAssignedRoutineView({ vm }: NewAssignedRoutineViewProps) {
  return (
    <Page className="bg-background">
      <Container className="py-6">
        <Stack gap="6">
          <NewAssignedRoutineHeader step={vm.wizard.step} routineExerciseCount={vm.routine.routineExercises.length} onStepChange={vm.actions.onStepChange} />

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
            <RoutineStepContent
              step={vm.wizard.step}
              selectedTemplate={vm.routine.selectedTemplate}
              assignmentName={vm.routine.assignmentName}
              routineExercises={vm.routine.routineExercises}
              clientItems={vm.clients.clientItems}
              selectedClientIds={vm.clients.selectedClientIds}
              clientFilter={vm.clients.clientFilter}
              clientSearch={vm.clients.clientSearch}
              isLoadingClients={vm.catalogs.isLoadingClients}
              onOpenTemplatePicker={() => vm.actions.onOpenTemplatePicker(true)}
              onClearTemplate={vm.actions.onClearTemplate}
              onOpenExercisePicker={() => vm.actions.onOpenExercisePicker(true)}
              onRemoveExercise={vm.actions.onRemoveExercise}
              onUpdateExercise={vm.actions.onUpdateExercise}
              onClientToggle={vm.actions.onClientToggle}
              onClientFilterChange={vm.actions.onClientFilterChange}
              onClientSearchChange={vm.actions.onClientSearchChange}
              onAssignmentNameChange={vm.actions.onAssignmentNameChange}
            />

            <RoutineSummarySidebar
              step={vm.wizard.step}
              selectedTemplate={vm.routine.selectedTemplate}
              routineExercises={vm.routine.routineExercises}
              routineNotes={vm.routine.routineNotes}
              repeatMode={vm.wizard.repeatMode}
              startDate={vm.wizard.startDate}
              endDate={vm.wizard.endDate}
              onStepChange={vm.actions.onStepChange}
              onRoutineNotesChange={vm.actions.onRoutineNotesChange}
              onRepeatModeChange={vm.actions.onRepeatModeChange}
              onStartDateChange={vm.actions.onStartDateChange}
              onEndDateChange={vm.actions.onEndDateChange}
            />
          </div>
        </Stack>
      </Container>

      <AssignmentFooter
        step={vm.wizard.step}
        selectedClientCount={vm.clients.selectedClientIds.length}
        isSubmitting={vm.submission.isSubmitting}
        canContinue={vm.routine.routineExercises.length > 0}
        canAssign={vm.clients.selectedClientIds.length > 0 && vm.routine.routineExercises.length > 0}
        onCancel={vm.actions.onCancel}
        onBack={vm.actions.onBack}
        onContinue={vm.actions.onContinue}
        onAssign={vm.actions.onAssign}
      />

      <TemplatePickerDialog
        open={vm.dialogs.templatePickerOpen}
        templates={vm.catalogs.templates}
        selectedTemplateId={vm.routine.selectedTemplateId}
        isLoading={vm.catalogs.isLoadingTemplates}
        onOpenChange={(open) => (open ? vm.actions.onOpenTemplatePicker(true) : vm.actions.onCloseTemplatePicker())}
        onSelectTemplate={vm.actions.onSelectTemplate}
      />

      <ExercisePickerDialog
        open={vm.dialogs.exercisePickerOpen}
        exercises={vm.catalogs.exercises}
        routineExercises={vm.routine.routineExercises}
        isLoading={vm.catalogs.isLoadingExercises}
        onOpenChange={(open) => (open ? vm.actions.onOpenExercisePicker(true) : vm.actions.onCloseExercisePicker())}
        onAddExercises={vm.actions.onAddExercises}
      />
    </Page>
  );
}
