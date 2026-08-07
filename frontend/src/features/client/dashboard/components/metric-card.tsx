import { Card, CardContent } from "@/components/ui/card";

import { type Metric } from "../types";

export default function MetricCard({ metric }: { metric: Metric }) {
  const Icon = metric.icon;

  return (
    <Card className="border-border/60 shadow-sm">
      <CardContent className="p-4">
        <div className={`rounded-2xl bg-linear-to-br p-3 ${metric.tone}`}>
          <Icon className="size-5" />
        </div>

        <div className="mt-4 space-y-1">
          <p className="text-3xl font-semibold tracking-tight">{metric.value}</p>
          <p className="text-sm text-muted-foreground">{metric.label}</p>
        </div>
      </CardContent>
    </Card>
  );
}
