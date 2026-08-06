import { Mono } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const MUSCLE_GROUPS = ["Todos", "Piernas", "Pecho", "Espalda", "Hombros", "Brazos", "Core"];

export default function ExercisesPageFilterBar() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="relative w-full lg:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input type="text" placeholder="Buscar ejercicio..." className="pl-10" />
      </div>
      <Tabs defaultValue="todos" className="w-full lg:w-auto">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 rounded-2xl bg-muted p-1 lg:w-auto">
          {MUSCLE_GROUPS.map((group) => (
            <TabsTrigger
              key={group}
              value={group.toLowerCase()}
              className="min-w-0 cursor-pointer px-3 text-xs whitespace-nowrap dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground sm:text-sm"
            >
              <Mono className="text-xs sm:text-sm">{group.toUpperCase()}</Mono>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}
