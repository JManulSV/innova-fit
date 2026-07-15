import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Edit, MoreVertical, Trash } from 'lucide-react'
import React from 'react'

interface ClientDropdownMenuProps {
  clientId: number
}

export default function ClientDropdownMenu({ clientId }: ClientDropdownMenuProps) {
  return (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="cursor-pointer">
            <MoreVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
            <DropdownMenuGroup>
                <DropdownMenuItem className="cursor-pointer" asChild>
                    <Link href={`/coach/clients/${clientId}/edit`} className="flex items-center gap-2">
                        <Edit />
                        Editar
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer text-destructive" asChild>
                    <Link href={`/coach/clients/${clientId}/delete`} className="flex items-center gap-2">
                        <Trash />
                        Eliminar
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    </DropdownMenu>
  )
}
