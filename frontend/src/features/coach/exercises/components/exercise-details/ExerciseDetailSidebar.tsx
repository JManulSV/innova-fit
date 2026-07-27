import { Card } from "@/components/ui/card";
import { H2, Mono, Text } from "@/components/typography";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ExerciseDetailSidebarProps {
  title?: string;
  bodyPart?: string[];
  exerciseId: string;
}

export default function ExerciseDetailSidebar({ bodyPart, exerciseId }: ExerciseDetailSidebarProps) {
    const router = useRouter(); 
    return (
    <div>
        {/* Body parts list component */}
        <Card className="flex flex-col items-start gap-3 p-4">
            <Mono className="text-muted-foreground">Grupo muscular</Mono>
            <div className="border-l-6 rounded-sm border-primary p-2">
                <Mono className="text-muted-foreground">Principal</Mono>
                <h3 className="text-lg font-semibold">{bodyPart?.[0]}</h3>
            </div>
            {bodyPart && bodyPart?.length > 1 && (
                <div className="border-l-4 rounded-sm border-secondary p-2 w-full bg-muted/30">
                        <>
                            <Mono className="text-xs text-muted-foreground font-medium">Secundario</Mono>
                            {bodyPart?.slice(1).map((part, index) => (
                                <h3 key={index} className="text-sm font-medium text-foreground">{part}</h3>
                            ))}
                        </>
                </div>
            )}
      </Card>
      
      {/* Button components */}
        <Card className="flex flex-col items-start gap-3 p-6 mt-6">
            <Button 
                className="w-full cursor-pointer" 
                size={"lg"}
                onClick={() => router.push(`/coach/exercises/${exerciseId}/edit`)}
            >
                <Edit className="h-6 w-6" />
                Editar Ejercicio
            </Button>
            <Button 
                className="w-full cursor-pointer" 
                variant="destructive" 
                size={"lg"}
                onClick={() => router.push(`/coach/exercises/${exerciseId}/delete`)}
            >
                <Trash className="h-6 w-6" />
                Eliminar Ejercicio
            </Button>
        </Card>
    </div>
  )
}
