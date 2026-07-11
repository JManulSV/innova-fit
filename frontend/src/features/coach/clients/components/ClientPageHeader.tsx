import { H2, Text } from "@/components/typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClientPageHeaderProps {
  clientCount: number;
}

export default function ClientPageHeader({ clientCount }: ClientPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
        <div>
            <H2>Clientes</H2>
            <Text>Tienes {clientCount} clientes en tu lista</Text>
        </div>
        <Button asChild>
            <Link href="/coach/clients/add">Añadir Cliente</Link>
        </Button>
    </div>
  )
}
