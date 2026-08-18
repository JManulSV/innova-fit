"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useExercise } from "../hooks/use-exercise";
import ExerciseDetailMain from "../components/exercise-details/ExerciseDetailMain";
import ExerciseDetailSkeleton from "../components/exercise-details/ExerciseDetailSkeleton";
import ExerciseDetailSidebar from "../components/exercise-details/ExerciseDetailSidebar";
import { Container } from "@/components/design-system/container";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Mono } from "@/components/typography";


export default function ExercisePageDetails() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const router = useRouter();
  const { data: exercise, isLoading, isError } = useExercise(id);
  
  if (!id) {
    return (
      <Container className="py-8">
        <div className="text-lg font-semibold">ID de ejercicio inválido.</div>
        <Link href="/coach/exercises" className="text-primary underline mt-4 inline-block">
          Volver a ejercicios
        </Link>
      </Container>
    );
  }
  
  function handleBack() {
    router.back();
  }

  if (isLoading) {
    return (
      <Container className="py-8">
        <ExerciseDetailSkeleton />
      </Container>
    );
  }

  if (isError || !exercise) {
    return (
      <Container className="py-8">
        <div className="text-lg font-semibold">No se encontró el ejercicio.</div>
        <Link href="/coach/exercises" className="text-primary underline mt-4 inline-block">
          Volver a ejercicios
        </Link>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <Button onClick={handleBack} variant={'ghost'}  className="flex gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" />
        <Mono>Volver a ejercicios</Mono>
      </Button>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <ExerciseDetailMain
            title={exercise.name}
            description={exercise.description}
            instructions={exercise.instructions}
          />
        </div>
        <div className="md:col-span-1">
          <ExerciseDetailSidebar 
            bodyParts={exercise.body_parts ?? []} 
            exerciseId={exercise.id}
          />
        </div>
      </div>
    </Container>
  );
}
