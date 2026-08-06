import Link from "next/link";
import { type ComponentType } from "react";
import { ArrowRight, Bell, Dumbbell, Flame, Timer, Trophy } from "lucide-react";

import { Container } from "@/components/design-system/container";
import { Page, PageDescription, PageHeader, PageTitle, PageTitleGroup } from "@/components/design-system/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

type Metric = {
  icon: ComponentType<{ className?: string }>;
  value: string;
  label: string;
  tone: string;
};

type RoutineItem = {
  day: string;
  emoji: string;
  title: string;
  subtitle: string;
  duration: string;
  exercises: string;
  tags: string[];
  status: string;
  featured?: boolean;
};

type ActivityItem = {
  title: string;
  when: string;
  duration: string;
  calories: string;
};

const metrics: Metric[] = [
  {
    icon: Trophy,
    value: "4",
    label: "días seguidos",
    tone: "from-amber-500/15 to-amber-500/5 text-amber-600 dark:text-amber-400",
  },
  {
    icon: Timer,
    value: "168",
    label: "min esta semana",
    tone: "from-sky-500/15 to-sky-500/5 text-sky-600 dark:text-sky-400",
  },
  {
    icon: Dumbbell,
    value: "3/5",
    label: "rutinas completadas",
    tone: "from-emerald-500/15 to-emerald-500/5 text-emerald-600 dark:text-emerald-400",
  },
];

const weekRoutines: RoutineItem[] = [
  {
    day: "LUN",
    emoji: "🌤",
    title: "Tren superior — Fuerza",
    subtitle: "Completada",
    duration: "45 min",
    exercises: "8 ejercicios",
    tags: ["Pecho", "Espalda"],
    status: "Completada",
  },
  {
    day: "MIE",
    emoji: "💪",
    title: "Piernas — Hipertrofia",
    subtitle: "Completada",
    duration: "50 min",
    exercises: "9 ejercicios",
    tags: ["Cuádriceps", "Glúteo"],
    status: "Completada",
  },
  {
    day: "JUE",
    emoji: "🔥",
    title: "Full Body — Resistencia",
    subtitle: "Hoy",
    duration: "40 min",
    exercises: "7 ejercicios",
    tags: ["Cuerpo completo"],
    status: "Hoy",
    featured: true,
  },
  {
    day: "VIE",
    emoji: "🧘",
    title: "Core y movilidad",
    subtitle: "Próxima",
    duration: "30 min",
    exercises: "6 ejercicios",
    tags: ["Core", "Movilidad"],
    status: "Próxima",
  },
];

const recentActivities: ActivityItem[] = [
  {
    title: "Piernas — Hipertrofia",
    when: "Hace 1 día",
    duration: "52 min",
    calories: "410 kcal",
  },
  {
    title: "Tren superior — Fuerza",
    when: "Hace 3 días",
    duration: "47 min",
    calories: "340 kcal",
  },
];

function MetricCard({ metric }: { metric: Metric }) {
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

function RoutineCard({ routine }: { routine: RoutineItem }) {
  const featuredClasses = routine.featured
    ? "border-foreground/20 bg-card shadow-[0_12px_30px_-20px_rgba(0,0,0,0.45)]"
    : "border-border/60 bg-card/95";

  return (
    <Card className={`transition-transform hover:-translate-y-0.5 ${featuredClasses}`}>
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span>{routine.emoji}</span>
              <span>{routine.day}</span>
            </div>
            <h3 className="text-base font-semibold leading-tight sm:text-lg">{routine.title}</h3>
            <p className="text-sm text-muted-foreground">{routine.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="text-sm font-medium">○</span>
            <ArrowRight className="size-4" />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Timer className="size-4" />
            {routine.duration}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Dumbbell className="size-4" />
            {routine.exercises}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Badge variant={routine.featured ? "default" : "secondary"}>{routine.status}</Badge>
          {routine.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="bg-background/60">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityCard({ activity }: { activity: ActivityItem }) {
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

export default function DashboardPage() {
  const initials = "DT";

  return (
    <Page>
      <Container className="space-y-8 py-4 sm:py-6">
        <header className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="size-10 bg-card ring-1 ring-border/70">
                <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm text-muted-foreground">○ {initials}</p>
              </div>
            </div>

            <Button variant="ghost" size="icon-sm" className="rounded-full" aria-label="Notificaciones">
              <Bell className="size-4" />
            </Button>
          </div>

          <PageHeader>
            <PageTitleGroup>
              <PageDescription className="text-base">Buenos días,</PageDescription>
              <PageTitle className="max-w-sm text-3xl leading-tight">Daniela</PageTitle>
            </PageTitleGroup>
          </PageHeader>
        </header>

        <section aria-label="Resumen" className="grid gap-4 sm:grid-cols-3">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} metric={metric} />
          ))}
        </section>

        <Separator />

        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Esta semana</h2>
            </div>
          </div>

          <div className="grid gap-4">
            {weekRoutines.map((routine) => (
              <RoutineCard key={`${routine.day}-${routine.title}`} routine={routine} />
            ))}
          </div>
        </section>

        <Separator />

        <section className="space-y-4 pb-2">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold tracking-tight">Actividad reciente</h2>
          </div>

          <div className="grid gap-4">
            {recentActivities.map((activity) => (
              <ActivityCard key={`${activity.title}-${activity.when}`} activity={activity} />
            ))}
          </div>
        </section>
      </Container>
    </Page>
  );
}
