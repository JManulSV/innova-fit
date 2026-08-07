"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface WorkoutRestDialogProps {
  open: boolean;
  remainingSeconds: number;
  onAddTime: () => void;
  onSkip: () => void;
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(1, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
}

export default function WorkoutRestDialog({ open, remainingSeconds, onAddTime, onSkip }: WorkoutRestDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onSkip()}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl">Descanso</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4 py-2 text-center">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border border-primary/15 bg-primary/5 text-3xl font-semibold tabular-nums text-primary">
            {formatTime(remainingSeconds)}
          </div>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button type="button" variant="outline" onClick={onAddTime}>
            +15 seg
          </Button>
          <Button type="button" variant="secondary" onClick={onSkip}>
            Saltar descanso
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
