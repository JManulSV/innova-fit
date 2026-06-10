import CoachHeader from "./CoachHeader";
import CoachSidebar from "./CoachSidebar";


interface Props {
  children: React.ReactNode;
}

export default function CoachShell({
  children,
}: Props) {
  return (
    <div className="flex">
      <CoachSidebar />

      <div className="flex-1">
        <CoachHeader />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}