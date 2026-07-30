"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

type SortMode = "recent" | "oldest" | "name";

export default function SearchSortBar({
  search,
  onSearchChange,
  sortMode,
  onSortChange,
  sortOptions,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  sortMode: SortMode;
  onSortChange: (value: SortMode) => void;
  sortOptions: Array<{ value: SortMode; label: string }>;
}) {
  return (
    <section className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_180px]">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Buscar plantilla por nombre..."
          className="h-11 border-border bg-card pl-10 text-foreground placeholder:text-muted-foreground focus-visible:bg-popover"
        />
      </div>

      <select
        value={sortMode}
        onChange={(event) => onSortChange(event.target.value as SortMode)}
        className={cn(
          "h-11 rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none transition-colors focus:border-ring",
        )}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </section>
  );
}
