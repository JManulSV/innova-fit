"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/design-system/container";
import { Page, PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";
import { useMyRoutine } from "@/features/client/my-routine/hooks/use-get-my-routines";
import type { RoutineExercise } from "@/features/client/my-routine/types";
import { ChevronDown, ChevronUp, Play } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

function formatExerciseOrder(order: number) {
  return order.toString().padStart(2, "0");
}

function getMuscleGroups(exercise: RoutineExercise) {
  const groups = exercise.exercise.muscle_groups ?? [];

  return groups.length > 0 ? groups.join(" • ") : exercise.exercise_name;
}

function RoutinesPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0];
  const { data: routine, isPending, isError } = useMyRoutine(id ?? "");
  const router = useRouter();

  if (isPending) {
    return <div>Cargando...</div>;
  }

  if (isError || !routine) {
    return <div>No se encontró la rutina</div>;
  }

  return (
    <Page>
      <Container className="space-y-6 py-4 sm:py-6">
        <PageHeader>
          <PageTitleGroup>
            <PageTitle className="text-3xl leading-tight">{routine.name}</PageTitle>
            <PageDescription className="text-base">{routine.notes}</PageDescription>
          </PageTitleGroup>
        </PageHeader>

        <Card className="border-border/60 bg-card/95 shadow-sm">
          <CardContent className="flex flex-wrap gap-2 p-4">
            <Badge variant="secondary">{routine.exercises.length} ejercicios</Badge>
            <Badge variant="outline">{routine.status}</Badge>
            <Badge variant="outline">{routine.computed_status}</Badge>
          </CardContent>
        </Card>

        <Tabs defaultValue="exercises" className="space-y-4">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="exercises">Ejercicios</TabsTrigger>
            <TabsTrigger value="notes">Notas</TabsTrigger>
          </TabsList>

          <TabsContent value="exercises" className="space-y-3">
            {routine.exercises.map((exercise: RoutineExercise) => (
              <ExerciseCard key={exercise.id} exercise={exercise} />
            ))}
          </TabsContent>

          <TabsContent value="notes">
            <Card>
              <CardHeader>
                <CardTitle>Notas de la rutina</CardTitle>
                <CardDescription>Información general asociada a esta rutina.</CardDescription>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">{routine.notes || "Sin notas."}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Button
          className="w-full"
          onClick={() => router.push(`/client/workout-session/${routine.id}`)}
        >
          <Play className="mr-2 size-4" />
          Iniciar entrenamiento
        </Button>
      </Container>
    </Page>
  );
}

export default RoutinesPage;

export function ExerciseCard({ exercise }: { exercise: RoutineExercise }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card className="border-border/60">
      <button
        type="button"
        className="flex w-full items-start justify-between gap-3 px-4 py-3 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-muted-foreground">{formatExerciseOrder(exercise.exercise_order)}</span>
            <p className="text-base font-semibold">{exercise.exercise_name}</p>
          </div>
          <p className="text-sm text-muted-foreground">
            {exercise.sets} series x {exercise.reps} reps • {exercise.rest_seconds}s descanso
          </p>
          <Badge variant="outline" className="w-fit">
            {getMuscleGroups(exercise)}
          </Badge>
        </div>

        {isExpanded ? <ChevronUp className="mt-1 size-5 shrink-0" /> : <ChevronDown className="mt-1 size-5 shrink-0" />}
      </button>

      {isExpanded ? (
        <CardContent className="border-t border-border/60 p-4 pt-3">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Series</p>
              <p className="text-base font-semibold">{exercise.sets}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Reps</p>
              <p className="text-base font-semibold">{exercise.reps}</p>
            </div>
            <div className="rounded-lg bg-muted/40 p-3">
              <p className="text-xs text-muted-foreground">Descanso</p>
              <p className="text-base font-semibold">{exercise.rest_seconds}s</p>
            </div>
          </div>
        </CardContent>
      ) : null}
    </Card>
  );
}
