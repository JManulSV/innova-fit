"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  activeFilter: string;
  filters: string[];
  onFilterChange: (filter: string) => void;
};

export default function ExerciseSelectorSidebar({ query, onQueryChange, activeFilter, filters, onFilterChange }: Props) {
  return (
    <div className="space-y-2.5">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Buscar ejercicio..." className="pl-9 text-sm lg:h-7 lg:text-sm" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        {filters.map((filter) => (
          <Button
            key={filter}
            type="button"
            size="sm"
            variant={activeFilter === filter ? "default" : "outline"}
            className={cn("rounded-full text-[11px] lg:h-6 lg:px-2.5 lg:text-[10px]", activeFilter === filter ? "shadow-none" : "border-border")}
            onClick={() => onFilterChange(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>
    </div>
  );
}
