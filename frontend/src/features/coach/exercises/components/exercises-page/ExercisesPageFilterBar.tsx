import { Mono } from "@/components/typography";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const MUSCLE_GROUPS = ["Todos", "Piernas", "Pecho", "Espalda", "Hombros", "Brazos", "Core"];

export default function ExercisesPageFilterBar() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input type="text" placeholder="Buscar ejercicio..." className="pl-10" />
      </div>
      <Tabs defaultValue="todos">
        <TabsList>
          {MUSCLE_GROUPS.map((group) => (
            <TabsTrigger
              key={group}
              value={group.toLowerCase()}
              className="cursor-pointer dark:data-[state=active]:bg-primary dark:data-[state=active]:text-primary-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Mono className="text-sm">{group.toUpperCase()}</Mono>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
}