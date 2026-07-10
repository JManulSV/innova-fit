import CoachHeader from "./CoachHeader";
import CoachSidebar from "./CoachSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";

interface Props {
  children: React.ReactNode;
}

export default function CoachShell({
  children,
}: Props) {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <div className="flex h-screen w-full min-h-screen overflow-hidden">
          <CoachSidebar />

          <div className="flex-1 flex min-h-0 flex-col">
            <CoachHeader />

            <main className="flex-1 min-h-0 overflow-auto p-6">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </TooltipProvider>
  );
}