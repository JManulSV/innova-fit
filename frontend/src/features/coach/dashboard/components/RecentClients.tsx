import Link from "next/link";
import { Muted, Text } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { getInitials } from "@/lib/get-initials";
import { RecentUser } from "../types/dashboard.type";
import RecentClientsSkeleton from "./RecentClientsSkeleton";
import EmptyState from "./EmptyState";

function formatRecentDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible'
  }

  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

interface RecentClientsProps {
  clients: RecentUser[];
  isLoading?: boolean;
}

function RecentClients({ clients, isLoading }: RecentClientsProps) {
  if (isLoading) {
    return <RecentClientsSkeleton />;
  }

  if (clients.length === 0) {
    return (
      <EmptyState
        title="No hay clientes recientes"
        description="Aún no tienes clientes recientes. Empieza creando uno para que aparezca aquí."
        actionLabel="Crear cliente"
        actionHref="/coach/clients/create"
      />
    );
  }

  return (
    <Card className="overflow-hidden p-0 gap-0">
      {clients.map((client) => (
        <Link
          key={client.id}
          href={`/coach/clients/${client.id}`}
          className="flex items-center justify-between border-b border-border px-5 py-3 last:border-b-0 hover:bg-muted/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {getInitials(client.name, "C")}
            </div>

            <Text className="font-medium text-sm leading-none">
              {client.name}
            </Text>
          </div>

          <div className="flex items-center gap-3">
            <Muted className="text-xs">
              {formatRecentDate(client.created_at)}
            </Muted>
            <ChevronRight className="size-4 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </Card>
  );
}

export default RecentClients;
