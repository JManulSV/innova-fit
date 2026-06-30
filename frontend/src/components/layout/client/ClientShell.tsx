import BottomNavigation from "./BottomNavigation";
import ClientHeader from "./ClientHeader";

interface ClientShellProps {
  children: React.ReactNode;
}

export default function ClientShell({
  children,
}: ClientShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      <ClientHeader />

      <main className="flex-1 px-4 py-4 pb-24">
        {children}
      </main>

      <BottomNavigation />

    </div>
  );
}