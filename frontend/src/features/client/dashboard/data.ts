import { Dumbbell, Timer, Trophy } from "lucide-react";

import { type Metric } from "./types";

export const metrics: Metric[] = [
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
