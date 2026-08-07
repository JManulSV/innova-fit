import { CalendarDays, Dumbbell, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

import { type Workout } from "../types";
import { formatDashboardDate } from "../utils";

export default function CurrentWorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4 text-primary" />
              <span>Rutina actual</span>
            </div>
            <h3 className="text-lg font-semibold leading-tight sm:text-xl">{workout.name}</h3>
            <p className="text-sm text-muted-foreground">{workout.notes || "Sin notas"}</p>
          </div>

          <Badge variant="default">{workout.computed_status}</Badge>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant="outline" className="bg-background/60">
            <CalendarDays className="mr-1.5 size-3.5" />
            {formatDashboardDate(workout.assigned_date)}
          </Badge>
          <Badge variant="outline" className="bg-background/60">
            <Dumbbell className="mr-1.5 size-3.5" />
            {workout.status}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
