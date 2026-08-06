import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Container } from "@/components/design-system/container";
import { PageDescription, PageTitle } from "@/components/design-system/page";
import { useAuthStore } from "@/stores/auth-store";

export default function ClientHeader() {

  const user = useAuthStore(state => state.user);

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="border-b border-border/70 bg-card/85 backdrop-blur supports-backdrop-filter:bg-card/70">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <PageTitle className="text-2xl">
              Hola, {user?.name ?? "cliente"}
            </PageTitle>

            <PageDescription className="mt-1">
              Bienvenido de nuevo
            </PageDescription>
          </div>

          <Avatar className="size-10 shrink-0 ring-2 ring-background">
            <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
              {initials ?? "C"}
            </AvatarFallback>
          </Avatar>
        </div>
      </Container>
    </header>
  );
}
