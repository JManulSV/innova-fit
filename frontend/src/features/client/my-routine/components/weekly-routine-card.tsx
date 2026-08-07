import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

import { type Workout } from "@/features/client/dashboard/types";
import { formatRoutineDate } from "../utils";

export default function WeeklyRoutineCard({ routine }: { routine: Workout }) {
  return (
    <Card className="border-border/60 bg-card/95 shadow-sm">
      <CardContent className="p-0">
        <Link href={`/client/routines/${routine.id}`} className="block p-4 transition-colors hover:bg-accent/40 sm:p-5">
          <p className="text-sm text-muted-foreground">{formatRoutineDate(routine.start_date)}</p>
          <h3 className="mt-1 text-lg font-semibold leading-tight">{routine.name}</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {routine.status} · {routine.notes || "Sin notas"}
          </p>
        </Link>
      </CardContent>
    </Card>
  );
}
