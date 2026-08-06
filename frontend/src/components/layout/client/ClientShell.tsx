import BottomNavigation from "./BottomNavigation";
import ClientHeader from "./ClientHeader";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({
  children,
}: ClientShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">

      <ClientHeader />

      <main className="flex-1 px-4 py-4 pb-[calc(8rem+env(safe-area-inset-bottom))]">
        {children}
      </main>

      <BottomNavigation />

    </div>
  );
}
