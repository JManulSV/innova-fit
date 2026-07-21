import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Delete, Edit, MoreVertical, Trash } from 'lucide-react'
import React from 'react'
import DeleteClientDialog from '../client-delete/DeleteClientDialog'

interface ClientDropdownMenuProps {
  clientId: number
}

export default function ClientDropdownMenu({ clientId }: ClientDropdownMenuProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild >
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='min-w-25'>
            <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" asChild>
                    <Button asChild variant="ghost" className="w-full justify-start gap-2">
                      <Link href={`/coach/clients/${clientId}/edit`} className="flex items-center gap-2">
                          <Edit />
                          Editar
                      </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive" asChild>
                    <DeleteClientDialog buttonLabel='Eliminar' clientId={clientId} />
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
