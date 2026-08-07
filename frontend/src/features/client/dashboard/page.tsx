"use client";

import { Bell } from "lucide-react";

import { Container } from "@/components/design-system/container";
import { Page, PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import ActivityCard from "./components/activity-card";
import CurrentWorkoutCard from "./components/current-workout-card";
import MetricCard from "./components/metric-card";
import RoutineCard from "./components/routine-card";
import { useDashboard } from "./hooks/use-dashboard";
import { metrics } from "./data";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  const weekRoutines = data?.week_workouts ?? [];
  const currentWorkout = data?.current_workout;
  const lastActivity = data?.last_activity;

  return (
    <Page>
      <Container className="space-y-8 py-4 sm:py-6">
        <header className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 bg-card ring-1 ring-border/70">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  DF
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">○ Cliente</p>
              </div>
            </div>

            <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Notificaciones">
              <Bell className="size-4" />
            </Button>
          </div>

          <PageHeader>
            <PageTitleGroup>
              <PageDescription className="text-base">Buenos días,</PageDescription>
              <PageTitle className="max-w-sm text-3xl leading-tight">{currentWorkout?.name ?? "Daniela"}</PageTitle>
            </PageTitleGroup>
          </PageHeader>
        </header>

        <section aria-label="Resumen" className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <Separator />

        {currentWorkout ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">Rutina actual</h2>
            </div>

            <CurrentWorkoutCard workout={currentWorkout} />
          </section>
        ) : null}

        <Separator />

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Esta semana</h2>
            </div>
          </div>

          {isLoading ? (
            <p className="text-sm text-muted-foreground">Cargando rutinas...</p>
          ) : isError ? (
            <p className="text-sm text-muted-foreground">No se pudieron cargar las rutinas.</p>
          ) : (
            <div className="grid gap-4">
              {weekRoutines.map((routine) => (
                <RoutineCard key={routine.id} routine={routine} />
              ))}
            </div>
          )}
        </section>

        <Separator />

        <section className="space-y-4 pb-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight">Actividad reciente</h2>
          </div>

          {lastActivity ? (
            <div className="grid gap-4">
              <ActivityCard
                activity={{
                  title: lastActivity.name,
                  when: lastActivity.end_date,
                  duration: lastActivity.status,
                  calories: lastActivity.notes ?? "",
                }}
              />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">Sin actividad reciente.</p>
          )}
        </section>
      </Container>
    </Page>
  );
}
