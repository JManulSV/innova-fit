import { Card } from "@/components/ui/card";
import { H2, Mono, Text } from "@/components/typography";
import { ArrowLeft, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface ExerciseDetailSidebarProps {
  title?: string;
  bodyPart?: string[];
}

export default function ExerciseDetailSidebar({ bodyPart }: ExerciseDetailSidebarProps) {

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
                <div className="border-l-6 rounded-sm border-primary p-2">
                        <>
                            <Mono className="text-muted-foreground">Secundario</Mono>
                            {bodyPart?.slice(1).map((part, index) => (
                                <h3 key={index} className="text-lg font-semibold">{part}</h3>
                            ))}
                        </>
                </div>
            )}
      </Card>
      
      {/* Button components */}
        <Card className="flex flex-col items-start gap-3 p-6 mt-6">
            <Button className="w-full cursor-pointer" size={"lg"}>
                <Edit className="h-6 w-6" />
                Editar Ejercicio
            </Button>
            <Button className="w-full cursor-pointer" variant="destructive" size={"lg"}>
                <Trash className="h-6 w-6" />
                Eliminar Ejercicio
            </Button>
        </Card>
    </div>
  )
}
