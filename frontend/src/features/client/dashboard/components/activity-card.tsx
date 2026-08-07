import { Flame } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { type ActivityItem } from "../types";

export default function ActivityCard({ activity }: { activity: ActivityItem }) {
  return (
    <Card className="border-border/60">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Flame className="size-4 text-primary" />
              <span>{activity.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{activity.when}</p>
          </div>

          <div className="text-right text-sm text-muted-foreground">
            <p className="font-medium text-foreground">{activity.duration}</p>
            <p>{activity.calories}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
