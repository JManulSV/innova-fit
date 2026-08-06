import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Mono, Muted } from "@/components/typography";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { Exercise } from "../../types/exercise.types";
import { useRouter } from "next/navigation";
import DeleteExerciseDialog from "../exercise-delete/DeleteExerciseDialog";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const router = useRouter();
  return (
    <div className="flex h-full min-h-44 flex-col gap-3 rounded-3xl border border-border bg-card p-4 transition-colors hover:-translate-y-0.5 hover:border-primary hover:shadow-md dark:hover:border-primary sm:p-5">
      {/* Title + Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold sm:text-lg">
            <Link
              href={`/coach/exercises/${exercise.id}`}
              aria-label={`Ver ${exercise.name}`}
              className="no-underline hover:underline"
            >
              {exercise.name}
            </Link>
          </h3>
          <Muted>{exercise.description}</Muted>
        </div>
        {exercise.muscle_groups?.[0] && (
          <Badge variant="secondary" className="shrink-0">
            <Mono className="text-xs">{exercise.muscle_groups[0].toUpperCase()}</Mono>
          </Badge>
        )}
      </div>

      {/* Instructions collapsible */}
      {exercise.instructions && (
        <Collapsible>
          <CollapsibleTrigger
            className="flex cursor-pointer items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Mono className="text-xs">Ver instrucciones</Mono> <ChevronDown className="h-3 w-3" />
          </CollapsibleTrigger>
          <CollapsibleContent
            className="p-3 bg-accent rounded-lg max-h-40 overflow-auto mt-2"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Muted className="">{exercise.instructions}</Muted>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Actions */}
      <div className="mt-auto flex flex-col gap-2 border-t border-border pt-2 sm:flex-row">
        <Button
          variant="outline"
          size="sm"
          className="w-full cursor-pointer *:hover:text-primary hover:border-primary hover:text-primary dark:hover:border-primary dark:hover:text-primary sm:flex-1"
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/coach/exercises/${exercise.id}/edit`);
          }}
        >
          <Pencil className="h-4 w-4" /> Editar
        </Button>
          <DeleteExerciseDialog
          exerciseId={exercise.id}
          buttonLabel="Eliminar"
          trigger={
            <Button
              variant="destructive"
              size="sm"
              className="w-full cursor-pointer sm:flex-1"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Trash2 className="inline-block h-4 w-4" aria-hidden="true" />
              Eliminar
            </Button>
          }
        />
      </div>
    </div>
  );
}
