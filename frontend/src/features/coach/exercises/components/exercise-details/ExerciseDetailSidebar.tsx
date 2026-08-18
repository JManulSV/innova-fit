import { Card } from "@/components/ui/card";
import { Mono } from "@/components/typography";
import { Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import DeleteExerciseDialog from "../exercise-delete/DeleteExerciseDialog";
import { BodyPart } from "../../types/exercise.types";
import { Badge } from "@/components/ui/badge";

interface ExerciseDetailSidebarProps {
  title?: string;
  bodyParts?: BodyPart[];
  exerciseId: string;
}

export default function ExerciseDetailSidebar({ bodyParts, exerciseId }: ExerciseDetailSidebarProps) {
    const router = useRouter(); 
    return (
    <div>
        <Card className="flex flex-col items-start gap-3 p-4">
            <Mono className="text-muted-foreground">Partes del cuerpo</Mono>
            <div className="flex w-full flex-wrap gap-2">
                {bodyParts?.map((part, index) => (
                    <Badge
                        key={part.id}
                        variant={index === 0 ? "default" : "outline"}
                        className={index === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground"}
                    >
                        {part.name}
                    </Badge>
                ))}
            </div>
            {bodyParts?.length === 0 && (
                <Mono className="text-muted-foreground">Sin partes del cuerpo asignadas</Mono>
            )}
      </Card>
      
        <Card className="flex flex-col items-start gap-3 p-6 mt-6">
            <Button 
                className="w-full cursor-pointer" 
                size={"lg"}
                onClick={() => router.push(`/coach/exercises/${exerciseId}/edit`)}
            >
                <Edit className="h-6 w-6" />
                Editar Ejercicio
            </Button>
            <div className="w-full">
                <DeleteExerciseDialog  
                    exerciseId={parseInt(exerciseId)} 
                    buttonLabel="Eliminar ejercicio" 
                    linkRedirect={`/coach/exercises`}
                    trigger= {
                        <Button 
                            className="w-full cursor-pointer"
                            size={"lg"}
                            variant={"destructive"}
                        >
                            <Trash className="h-4 w-4" />
                            <span className="text-destructive">Eliminar ejercicio</span>
                        </Button>
                    }
                />
            </div>
        </Card>
    </div>
  )
}
