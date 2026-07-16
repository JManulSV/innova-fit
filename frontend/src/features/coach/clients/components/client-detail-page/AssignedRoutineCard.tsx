import { Muted, Text } from '@/components/typography'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { ChevronRightIcon, DumbbellIcon } from 'lucide-react'
import type { ComponentProps } from 'react'

interface AssignedRoutineCardProps {
    title: string
    status: 'active' | 'inactive' | 'completed'
    startDate: string
    className?: ComponentProps<typeof Card>['className']
}

const statusConfig = {
    active: { label: 'Activa', variant: 'default' as const },
    inactive: { label: 'Inactiva', variant: 'outline' as const },
    completed: { label: 'Completada', variant: 'secondary' as const },
} satisfies Record<AssignedRoutineCardProps['status'], { label: string; variant: ComponentProps<typeof Badge>['variant'] }>

export default function AssignedRoutineCard({ title, status, startDate, className }: AssignedRoutineCardProps) {
    const statusDetails = statusConfig[status]

  return (
        <Card className={`flex flex-row items-center justify-between gap-4 p-4 transition hover:-translate-y-0.5 hover:shadow-md ${className ?? ''}`}>
            <div className='flex min-w-0 items-center gap-4'>
                <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-muted-foreground'>
                    <DumbbellIcon className='h-5 w-5' aria-hidden='true' />
                </div>

                <div className='min-w-0'>
                    <div className='flex flex-wrap items-center gap-2'>
                        <Text className='truncate font-semibold'>{title}</Text>
                        <Badge variant={statusDetails.variant}>{statusDetails.label}</Badge>
                    </div>
                    <Muted>Inició {new Date(startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}</Muted>
                </div>
            </div>

            <ChevronRightIcon className='h-4 w-4 shrink-0 text-muted-foreground' aria-hidden='true' />
    </Card>
  )
}
