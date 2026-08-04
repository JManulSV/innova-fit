"use client"

import { useMemo, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Exercise } from "@/features/coach/exercises/types/exercise.types";
import { Check, Dumbbell } from "lucide-react";

interface AddExerciseModalProps {
  exercises: Exercise[];
  isLoading?: boolean;
  onClose: () => void;
  onAdd: (exercise: Exercise) => void;
  selectedExerciseIds?: number[];
}

const CATEGORIES = ["TODOS", "PECHO", "PIERNA", "ESPALDA", "HOMBRO", "BRAZO"];

export default function AddExerciseModal({ exercises = [], isLoading, onClose, onAdd, selectedExerciseIds = [] }: AddExerciseModalProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("TODOS");
  const [selectedIds, setSelectedIds] = useState<number[]>(selectedExerciseIds);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exercises.filter((ex) => {
      if (category !== "TODOS") {
        const groups = ex.muscle_groups ?? [];
        if (!groups.map((g) => g.toUpperCase()).includes(category)) return false;
      }
      if (!q) return true;
      return ex.name.toLowerCase().includes(q) || (ex.description ?? "").toLowerCase().includes(q);
    });
  }, [exercises, query, category]);

  const toggleSelect = (id: number) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]));
  };

  const handleAddSelected = () => {
    const items = exercises.filter((e) => selectedIds.includes(e.id));
    items.forEach((it) => onAdd(it));
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="w-full max-w-xl p-5 sm:max-w-md md:max-w-lg lg:max-w-xl">
        <DialogHeader className="space-y-1.5 pb-1">
          <DialogTitle>Agregar ejercicios</DialogTitle>
          <div className="text-sm text-muted-foreground">Selecciona uno o varios ejercicios para la plantilla.</div>
        </DialogHeader>

        <div className="space-y-4 py-1">
          <div className="space-y-2.5">
            <Input placeholder="Buscar ejercicio guardado..." value={query} onChange={(e) => setQuery(e.target.value)} />
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((cat) => (
                <button key={cat} type="button" onClick={() => setCategory(cat)} className={`px-3 py-1 rounded-full text-sm ${category===cat? 'bg-primary text-white':'bg-muted/20 text-muted-foreground'}`}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <Separator className="my-1" />
          <div className="max-h-[52vh] space-y-2 overflow-y-auto py-1 pr-1 sm:max-h-[48vh] md:max-h-[52vh]">
            {isLoading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">Cargando...</div>
            ) : (
              filtered.map((ex) => (
                <Card
                  key={ex.id}
                  className={`border-0 transition-colors ${selectedIds.includes(ex.id) ? "bg-primary/5" : "hover:bg-muted/20"}`}
                  onClick={() => toggleSelect(ex.id)}
                >
                  <CardContent className="flex cursor-pointer items-center justify-between gap-4 px-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-muted/30 text-muted-foreground">
                        <Dumbbell className="h-4 w-4" />
                      </div>

                      <div className="min-w-0">
                        <div className="truncate text-sm font-semibold leading-5">{ex.name}</div>
                        <div className="truncate text-xs text-muted-foreground">{(ex.muscle_groups ?? []).join(" · ") || "Sin músculos especificados"}</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      aria-label={selectedIds.includes(ex.id) ? "Deseleccionar ejercicio" : "Seleccionar ejercicio"}
                      aria-pressed={selectedIds.includes(ex.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleSelect(ex.id);
                      }}
                    className={`flex size-7 shrink-0 items-center justify-center rounded-full border transition-colors ${selectedIds.includes(ex.id) ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"}`}
                    >
                      {selectedIds.includes(ex.id) ? <Check className="size-4" /> : null}
                    </button>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>

        <DialogFooter>
          <div className="flex w-full items-center justify-between gap-3 pt-1">
            <div className="text-sm">{selectedIds.length} seleccionados</div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button onClick={handleAddSelected} disabled={selectedIds.length === 0}>Agregar seleccionados</Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
