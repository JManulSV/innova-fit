"use client";

import { Container } from "@/components/design-system/container";
import { Page, PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";

import { useDashboard } from "../dashboard/hooks/use-dashboard";
import LastActivityCard from "./components/last-activity-card";
import WeeklyRoutineCard from "./components/weekly-routine-card";

export default function MyRoutinePage() {
  const { data, isLoading, isError } = useDashboard();

  const weekRoutines = data?.week_workouts ?? [];
  const lastActivity = data?.last_activity;

  return (
    <Page>
      <Container className="space-y-8 py-4 sm:py-6">
        <PageHeader>
          <PageTitleGroup>
            <PageTitle className="text-3xl leading-tight">Rutina</PageTitle>
            <PageDescription className="text-base">Tus rutinas asignadas y actividad reciente.</PageDescription>
          </PageTitleGroup>
        </PageHeader>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold tracking-tight">Esta semana</h2>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Cargando rutinas...</p>
          ) : isError ? (
            <p className="text-sm text-muted-foreground">No se pudieron cargar las rutinas.</p>
          ) : (
            <div className="grid gap-4">
              {weekRoutines.map((routine) => (
                <WeeklyRoutineCard key={routine.id} routine={routine} />
              ))}
            </div>
          )}
        </section>

        <section className="space-y-4 pb-2">
          <h2 className="text-xl font-semibold tracking-tight">Actividad reciente</h2>

          {lastActivity ? (
            <LastActivityCard activity={lastActivity} />
          ) : (
            <p className="text-sm text-muted-foreground">Sin actividad reciente.</p>
          )}
        </section>
      </Container>
    </Page>
  );
}
