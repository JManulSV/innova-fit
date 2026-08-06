"use client";

import { Container } from "@/components/design-system/container";
import { PageDescription, PageTitle } from "@/components/design-system/page";
import RoutinesGrid from "@/features/client/my-routine/components/RoutinesGrid";

export default function ClientWorkoutPage() {
  return (
    <Container className="py-4">
      <PageTitle className="text-2xl">Rutina</PageTitle>
      <PageDescription className="mt-1 pb-6">
        Tus rutinas asignadas y acceso directo a cada sesión.
      </PageDescription>

      <RoutinesGrid />
    </Container>
  );
}
