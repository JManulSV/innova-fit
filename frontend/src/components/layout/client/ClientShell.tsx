"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import BottomNavigation from "./BottomNavigation";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({
  children,
}: ClientShellProps) {
  const pathname = usePathname();
  const isWorkoutSession = pathname.startsWith("/client/workout-session");

  useEffect(() => {
    if (!isWorkoutSession) return;

    const { style } = document.body;
    const { style: rootStyle } = document.documentElement;
    const previousBodyOverflow = style.overflow;
    const previousBodyOverscroll = style.overscrollBehaviorY;
    const previousRootOverscroll = rootStyle.overscrollBehavior;

    style.overflow = "hidden";
    style.overscrollBehaviorY = "none";
    rootStyle.overscrollBehavior = "none";

    return () => {
      style.overflow = previousBodyOverflow;
      style.overscrollBehaviorY = previousBodyOverscroll;
      rootStyle.overscrollBehavior = previousRootOverscroll;
    };
  }, [isWorkoutSession]);

  return (
    <div
      className={cn(
        "flex flex-col bg-background",
        isWorkoutSession ? "h-dvh overflow-hidden" : "min-h-screen"
      )}
    >
      <main
        className={cn(
          "flex-1 min-h-0",
          isWorkoutSession
            ? "overflow-hidden px-0 py-0"
            : "px-4 py-4 pb-[calc(8rem+env(safe-area-inset-bottom))]"
        )}
      >
        {children}
      </main>

      {!isWorkoutSession && <BottomNavigation />}
    </div>
  );
}
