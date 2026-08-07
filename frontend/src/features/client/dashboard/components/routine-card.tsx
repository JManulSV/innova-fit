import { ArrowRight, CalendarDays } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { type Workout } from "../types";
import { formatDashboardDate } from "../utils";

export default function RoutineCard({ routine }: { routine: Workout }) {
  return (
    <Card className={`transition-transform hover:-translate-y-0.5`}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <CalendarDays className="size-4" />
              <span>{formatDashboardDate(routine.assigned_date)}</span>
            </div>
            <h3 className="text-base font-semibold leading-tight sm:text-lg">{routine.name}</h3>
            <p className="text-sm text-muted-foreground">{routine.notes || routine.status}</p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">○</span>
            <ArrowRight className="size-4" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-background/60">
            {routine.template_id} ejercicios
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
