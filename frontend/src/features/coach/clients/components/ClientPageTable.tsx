import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Client } from '../types/clients.types'
import Link from 'next/link'
import ClientDropdownMenu from './ClientDropdownMenu'

interface ClientPageTableProps {
  clients: Client[]
}

function getStatusLabel(status?: string) {
  if (!status) return 'Invitado'

  if (status === 'active') return 'Activo'
  if (status === 'inactive') return 'Inactivo'
  return status
}

function getStatusVariant(status?: string) {
  if (status === 'active') return 'default'
  if (status === 'inactive') return 'secondary'
  return 'outline'
}

export default function ClientPageTable({ clients }: ClientPageTableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="bg-background">
            <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
              Cliente
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
              Plantilla asignada
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
              Última actividad
            </TableHead>
            <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground text-right">
              Estado
            </TableHead>
            <TableHead className="px-4 py-3" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="group hover:bg-muted/50">
              <TableCell className="whitespace-nowrap px-4 py-2">
                <Link href={`/coach/clients/${client.id}`} className="flex items-center gap-3 no-underline hover:underline">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                    {client.name?.slice(0, 2).toUpperCase() || '??'}
                  </span>
                  <div className="min-w-0">
                    <div className="font-medium text-foreground">{client.name}</div>
                    <div className="text-xs text-muted-foreground">{client.email}</div>
                  </div>
                </Link>
              </TableCell>

              <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                {'—'}
              </TableCell>

              <TableCell className="px-4 py-4 text-sm text-muted-foreground">
                {'Invitación enviada'}
              </TableCell>

              <TableCell className="px-4 py-4 text-right">
                <Badge variant={getStatusVariant('active')}>
                  {getStatusLabel('active')}
                </Badge>
              </TableCell>

              <TableCell className="px-4 py-4 text-right">
                <ClientDropdownMenu clientId={client.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
