"use client";

import { Bell } from "lucide-react";

import { Container } from "@/components/design-system/container";
import { Page, PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import CurrentWorkoutCard from "./components/current-workout-card";
import MetricCard from "./components/metric-card";
import { useDashboard } from "./hooks/use-dashboard";
import { metrics } from "./data";

export default function DashboardPage() {
  const { data, isLoading, isError } = useDashboard();

  const currentWorkout = data?.current_workout;

  return (
    <Page>
      <Container className="space-y-8 py-4 sm:py-6">
        <header className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 bg-card ring-1 ring-border/70">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">DF</AvatarFallback>
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

        {currentWorkout ? (
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold tracking-tight">Rutina actual</h2>
            </div>

            <CurrentWorkoutCard workout={currentWorkout} />
          </section>
        ) : isLoading ? (
          <p className="text-sm text-muted-foreground">Cargando rutina actual...</p>
        ) : isError ? (
          <p className="text-sm text-muted-foreground">No se pudo cargar la rutina actual.</p>
        ) : null}
      </Container>
    </Page>
  );
}
