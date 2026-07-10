"use client";

import Link from "next/link";
import { LayoutDashboard, Users, Dumbbell, ClipboardList } from "lucide-react";

import LogoutButton from "@/components/LogoutButton";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export default function CoachSidebar() {
  return (
    <Sidebar collapsible="none" className="flex-shrink-0 w-72 h-full border-r border-sidebar-border bg-sidebar text-sidebar-foreground shadow-sm dark:shadow-none">
      <SidebarHeader className="px-4 py-5 border-b border-sidebar-border">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold">Innova-Fit</span>
          <span className="text-sm text-sidebar-foreground/70">Panel de entrenador</span>
        </div>
      </SidebarHeader>

      <SidebarSeparator />
      <SidebarContent className="flex-1 px-3 py-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Dashboard">
              <Link href="/coach/dashboard" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LayoutDashboard className="size-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Clientes">
              <Link href="/coach/clients" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Users className="size-4" />
                <span>Clientes</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Ejercicios">
              <Link href="/coach/exercises" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Dumbbell className="size-4" />
                <span>Ejercicios</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Plantillas">
              <Link href="/coach/templates" className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <ClipboardList className="size-4" />
                <span>Plantillas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="px-4 py-4 border-t border-sidebar-border">
        <LogoutButton />
      </SidebarFooter>
    </Sidebar>
  );
}