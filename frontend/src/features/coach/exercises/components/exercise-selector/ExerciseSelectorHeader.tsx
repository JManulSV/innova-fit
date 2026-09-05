"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  title: string;
  onClose: () => void;
};

export default function ExerciseSelectorHeader({ title, onClose }: Props) {
  const isMobile = useIsMobile();

  const Header = isMobile ? SheetHeader : DialogHeader;
  const Title = isMobile ? SheetTitle : DialogTitle;

  return (
    <Header className="px-4 py-3 lg:px-4 lg:py-3">
      <div className="flex items-start justify-between gap-3">
        <div className="p-0.5">
          <Title className="text-sm lg:text-base font-semibold ">{title}</Title>
        </div>

        <Button variant="ghost" size="icon-sm" className="lg:size-6" onClick={onClose} aria-label="Cerrar selector">
          <span aria-hidden="true">×</span>
        </Button>
      </div>
    </Header>
  );
}
