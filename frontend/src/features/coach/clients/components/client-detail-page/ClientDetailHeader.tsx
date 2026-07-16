import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button'
import { H1, Muted } from '@/components/typography';
import { ArrowLeftIcon, Edit, Mail, Phone, Target, Trash } from 'lucide-react'
import Link from 'next/link'

type ClientDetailHeaderProps = {
    clientName?: string;
    email?: string;
    phone?: string;
    goal?: string;
    statusLabel?: string;
}

export default function ClientDetailHeader({
    clientName = 'Nombre del Cliente',
    email = 'Correo del Cliente',
    phone = 'Teléfono del Cliente',
    goal = 'Metas del Cliente',
    statusLabel = 'Activo',
}: ClientDetailHeaderProps) {
    const getInitialsNameAvatar = (name: string) => {
        const names = name.trim().split(/\s+/).filter(Boolean);
        const initials = names.map((n) => n[0]).join('');
        return initials.slice(0, 2).toUpperCase();
    }
  
    return (
    <section className="border-b border-border pb-6">
        {/* Button to go back to the clients screen */}
        <Button asChild variant="ghost"  className="w-fit">
            <Link href="/coach/clients">
                <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
                <span className="text-muted-foreground">Regresar a clientes</span>
            </Link>
        </Button>

        {/* User data */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-4">
            <div className="flex items-center gap-4 mt-4">
                <div className="w-16 h-16 rounded-xl bg-card p-3 flex items-center justify-center">
                    <span className="text-2xl font-bold">{getInitialsNameAvatar(clientName)}</span>
                </div>
                <div>
                    <div className="flex items-center gap-2">
                        <H1 className="text-xl md:text-2xl">{clientName}</H1>
                        <Badge variant="default">{statusLabel}</Badge>
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-8">
                        <div className="flex items-center gap-1 mt-1">
                            <Mail className="inline-block mr-2 h-4 w-4" aria-hidden="true" />
                            <Muted>{email}</Muted>
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                            <Phone className="inline-block mr-2 h-4 w-4 " aria-hidden="true" />
                            <Muted>{phone}</Muted>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                        <Target className="inline-block mr-2 h-4 w-4" aria-hidden="true" />
                        <Muted>{goal}</Muted>
                    </div>
                </div>
            </div>

            {/* Botons actions */}
            <div className="mt-4 flex gap-2 md:mt-0">
                <Button variant="outline" >
                    <Edit className="inline-block mr-2 h-4 w-4" aria-hidden="true" />
                    Editar Cliente
                </Button>
                <Button variant="destructive">
                    <Trash className="inline-block mr-2 h-4 w-4" aria-hidden="true" />
                    Eliminar Cliente
                </Button>
            </div>

        </div>
    </section>
  )
}
