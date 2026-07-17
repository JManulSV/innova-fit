import { H2, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

interface ClientsPageHeaderProps {
  clientCount: number;
}

export default function ClientsPageHeader({ clientCount }: ClientsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
        <div>
            <H2>Clientes</H2>
            <Text>Tienes {clientCount} clientes en tu lista</Text>
        </div>
        <Link href="/coach/clients/create">
          <Button>
            <Plus className="h-4 w-4" />
            <span>Añadir Cliente</span>
          </Button>
        </Link>
    </div>
  )
}
