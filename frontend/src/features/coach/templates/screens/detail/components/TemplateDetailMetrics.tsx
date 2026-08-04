import { Activity, Clock3, Layers3, Target } from "lucide-react";

import { Mono, Muted, Text } from "@/components/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Template } from "@/features/coach/templates/types/templates.type";

interface TemplateDetailMetricsProps {
  template: Template;
}

function getPrimaryFocus(template: Template) {
  const groups = (template.exercises ?? []).flatMap((exercise) => exercise.muscle_groups ?? []);

  if (groups.length === 0) return "General";

  const tally = groups.reduce<Record<string, number>>((acc, group) => {
    const key = group.trim();

    if (!key) return acc;

    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const [topGroup = "General"] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0] ?? [];
  return topGroup
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getEstimatedMinutes(template: Template) {
  const totalSeconds = (template.exercises ?? []).reduce((sum, exercise) => {
    const workSeconds = exercise.sets * 90;
    const recoverySeconds = Math.max(exercise.sets - 1, 0) * exercise.rest_seconds;
    return sum + workSeconds + recoverySeconds;
  }, 0);

  return Math.max(1, Math.round(totalSeconds / 60));
}

export default function TemplateDetailMetrics({ template }: TemplateDetailMetricsProps) {
  const exercises = template.exercises ?? [];
  const totalSets = exercises.reduce((sum, exercise) => sum + exercise.sets, 0);
  const totalReps = exercises.reduce((sum, exercise) => sum + exercise.sets * exercise.reps, 0);
  console.log(template);
  const metrics = [
    {
      label: "Ejercicios",
      value: exercises.length,
      helper: "Bloques en la secuencia",
      icon: Activity,
    },
    {
      label: "Series totales",
      value: totalSets,
      helper: `${totalReps} repeticiones estimadas`,
      icon: Layers3,
    },
    {
      label: "Min. estimados",
      value: `~${getEstimatedMinutes(template)}`,
      helper: "Incluye trabajo y descansos",
      icon: Clock3,
    },
    {
      label: "Enfoque",
      value: getPrimaryFocus(template),
      helper: "Grupo muscular dominante",
      icon: Target,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <Card key={metric.label} className="border-border bg-card text-card-foreground">
            <CardContent className="flex h-full items-start justify-between gap-3 py-1">
              <div className="space-y-2">
                <Muted className="text-xs uppercase tracking-[0.16em]">{metric.label}</Muted>
                <Text className="text-xl font-semibold leading-none text-card-foreground md:text-2xl">
                  {metric.value}
                </Text>
                <Mono className="text-xs text-muted-foreground">{metric.helper}</Mono>
              </div>

              <div className="rounded-xl border border-border bg-popover p-2.5 text-primary">
                <Icon className="h-4 w-4" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}