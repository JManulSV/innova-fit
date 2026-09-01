"use client";

import { useState } from "react";
import { ArrowLeft, Clock3, LayoutList } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface WorkoutTopBarProps {
  elapsedSeconds: number;
  onOpenNavigator: () => void;
}

function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function WorkoutTopBar({
  elapsedSeconds,
  onOpenNavigator,
}: WorkoutTopBarProps) {
  const router = useRouter();
  const [showExitDialog, setShowExitDialog] = useState(false);

  function handleConfirmExit() {
    router.push("/client/workout");
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 px-3 py-2">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setShowExitDialog(true)}
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="sr-only">Volver</span>
        </Button>

        <div className="flex items-center gap-1.5 text-sm font-medium tabular-nums">
          <span className="h-2 w-2 rounded-full bg-red-500" />
          <Clock3 className="h-4 w-4 text-muted-foreground" />
          <span>{formatTime(elapsedSeconds)}</span>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={onOpenNavigator}
        >
          <LayoutList className="h-5 w-5" />
          <span className="sr-only">Ver todos los ejercicios</span>
        </Button>
      </div>

      <Dialog open={showExitDialog} onOpenChange={setShowExitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¿Abandonar el entrenamiento?</DialogTitle>
            <DialogDescription>
              Los datos no guardados se perderán.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowExitDialog(false)}
            >
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleConfirmExit}>
              Abandonar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
