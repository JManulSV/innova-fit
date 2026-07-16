import { Muted } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AssignedRoutineCard from "./AssignedRoutineCard";


export default function ClientAssignedRoutinesTab() {
  return (
    <div>
        <div className="flex justify-between items-center pt-4">
            <Muted>{'3'} rutinas asignadas</Muted>
            <Button className="cursor-pointer" variant="outline">
                <Plus className=" h-4 w-4" />
                <span>Asignar nueva rutina</span>
            </Button>
        </div>

        <div className="flex flex-col gap-4 mt-8">
                <AssignedRoutineCard
                    title="Rutina de fuerza"
                    status="active"
                    startDate="2023-06-01"
                />

        </div>

    </div>
  )
}
