"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Dumbbell, ClipboardList } from "lucide-react";

import LogoutButton from "@/components/LogoutButton";
import CoachProfileCard from "./CoachProfileCard";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export default function CoachSidebar() {
  const pathname = usePathname() ?? "/";
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";

  const items = [
    { label: "Dashboard", href: "/coach/dashboard", icon: LayoutDashboard },
    { label: "Clientes", href: "/coach/clients", icon: Users },
    { label: "Ejercicios", href: "/coach/exercises", icon: Dumbbell },
    { label: "Plantillas", href: "/coach/templates", icon: ClipboardList },
  ];

  return (
    <Sidebar collapsible="icon" className="shrink-0 h-full border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm dark:shadow-none">
      <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold" title={isCollapsed ? "Innova-Fit" : undefined}>
            {isCollapsed ? "IF" : "Innova-Fit"}
          </span>
          {!isCollapsed && (
            <span className="text-sm text-sidebar-foreground/70">Panel de entrenador</span>
          )}
        </div>
      </SidebarHeader>

      <SidebarSeparator />
      <SidebarContent className={cn(
        isCollapsed ? "px-2 py-4 " :
        "flex-1 px-3 py-4"
        )}>
        <SidebarMenu className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild tooltip={item.label} isActive={active}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors",
                      active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarRail />

      <SidebarFooter 
        className={cn(
          "border-t border-sidebar-border",
          isCollapsed ? "px-2 py-4" : "px-4 py-4"
        )}>
        <div className="w-full">
          <CoachProfileCard />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
