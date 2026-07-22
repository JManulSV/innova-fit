import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Mono, Muted } from "@/components/typography";
import { ChevronDown, Pencil, Trash2 } from "lucide-react";
import { Exercise } from "../../types/exercise.types";

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <div className="rounded-3xl border border-border bg-card p-5 flex flex-col gap-3 hover:border-primary dark:hover:border-primary transition-colors hover:-translate-y-0.5 hover:shadow-md">
      {/* Title + Badge */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-base">{exercise.name}</h3>
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
          <CollapsibleTrigger className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-primary cursor-pointer">
            <Mono className="text-xs">Ver instrucciones</Mono> <ChevronDown className="h-3 w-3" />
          </CollapsibleTrigger>
          <CollapsibleContent className="p-3 bg-accent rounded-lg">
            <Muted className="">{exercise.instructions}</Muted>
          </CollapsibleContent>
        </Collapsible>
      )}

      {/* Actions */}
      <div className="flex gap-2 mt-auto pt-2 border-t border-border">
        <Button variant="outline" size="sm" className="flex-1 cursor-pointer *:hover:text-primary dark:hover:text-primary hover:border-primary dark:hover:border-primary ">
          <Pencil className="h-4 w-4" /> Editar
        </Button>
        <Button variant="outline" size="sm" className="flex-1 text-gray-500 dark:text-gray-400 cursor-pointer hover:text-destructive dark:hover:text-destructive hover:border-destructive dark:hover:border-destructive">
          <Trash2 className="h-4 w-4" /> Eliminar
        </Button>
      </div>
    </div>
  );
}