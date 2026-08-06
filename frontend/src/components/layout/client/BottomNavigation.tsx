"use client";

import { ClipboardCheck, HomeIcon, UserCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


export default function BottomNavigation() {

  const pathname = usePathname();

  const items = [
    {
      label: "Inicio",
      href: "/client/dashboard",
      icon: HomeIcon,
    },
    {
      label: "Rutina",
      href: "/client/workout",
      icon: ClipboardCheck,
    },
    {
      label: "Perfil",
      href: "/client/profile",
      icon: UserCircleIcon,
    },
  ];

  return (
    <nav
      aria-label="Navegación principal"
      className={cn(
        "fixed inset-x-0 z-50 border-t border-border/70 bg-background/95 shadow-[0_-12px_32px_-24px_rgba(0,0,0,0.35)] backdrop-blur supports-backdrop-filter:bg-background/80",
        "bottom-[env(safe-area-inset-bottom)] pb-3"
      )}
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-1 px-3 pt-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">

        {items.map((item) => {

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(`${item.href}/`) ||
            (item.href === "/client/workout" &&
              (pathname.startsWith("/client/routines") ||
                pathname.startsWith("/client/workout-session")));

          return (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "h-14 min-h-11 flex-col gap-1 rounded-2xl px-2 text-xs text-muted-foreground transition-colors",
                active && "bg-primary/10 text-primary"
              )}
            >
              <Link href={item.href} aria-current={active ? "page" : undefined}>
                <Icon className="size-5" />
                <span className="font-medium leading-none">{item.label}</span>
              </Link>
            </Button>
          );

        })}

      </div>
    </nav>
  );
}
