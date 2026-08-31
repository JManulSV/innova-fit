"use client";

import { Button } from "@/components/ui/button";
import { DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

type Props = {
  title: string;
  description: string;
  onClose: () => void;
};

export default function ExerciseSelectorHeader({ title, description, onClose }: Props) {
  const isMobile = useIsMobile();

  const Header = isMobile ? SheetHeader : DialogHeader;
  const Title = isMobile ? SheetTitle : DialogTitle;
  const Description = isMobile ? SheetDescription : DialogDescription;

  return (
    <Header className="border-b px-4 py-3 lg:px-4 lg:py-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <Title className="text-sm lg:text-base">{title}</Title>
          <Description className="text-xs lg:text-sm">{description}</Description>
        </div>

        <Button variant="ghost" size="icon-sm" className="lg:size-6" onClick={onClose} aria-label="Cerrar selector">
          <span aria-hidden="true">×</span>
        </Button>
      </div>
    </Header>
  );
}
