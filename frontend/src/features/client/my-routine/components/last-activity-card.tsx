import { Card, CardContent } from "@/components/ui/card";

import { type Workout } from "@/features/client/dashboard/types";

import { formatRoutineDate } from "../utils";

export default function LastActivityCard({ activity }: { activity: Workout }) {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardContent className="p-4 sm:p-5">
        <p className="text-sm text-muted-foreground">Última actividad</p>
        <h3 className="mt-1 text-lg font-semibold leading-tight">{activity.name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{formatRoutineDate(activity.end_date)}</p>
      </CardContent>
    </Card>
  );
}
