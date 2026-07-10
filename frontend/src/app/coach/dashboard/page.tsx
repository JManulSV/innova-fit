"use client";
import { Container } from '@/components/layout/container'
import { Page } from '@/components/layout/page'
import { H2, Text } from '@/components/typography'
import { Button } from '@/components/ui/button'
import QuickAction from '@/features/coach/dashboard/components/QuickAction'
import RecentClients from '@/features/coach/dashboard/components/RecentClients'
import StatsCard from '@/features/coach/dashboard/components/StatsCard'
import { useDashboard } from '@/features/coach/dashboard/hooks/use-dashboard'
import DashboardSkeleton from '@/features/coach/dashboard/components/DashboardSkeleton'
import { RecentUser, Stats } from '@/features/coach/dashboard/types/dashboard.type'
import { ClipboardCheck, ClipboardList, Dumbbell, FilePlus, UserPlus, Users } from 'lucide-react'
import Link from 'next/link'

const STAT_CARDS = [
  {
    title: 'Clientes',
    valueKey: 'total_clients' as const,
    icon: Users,
  },
  {
    title: 'Ejercicios',
    valueKey: 'total_exercises' as const,
    icon: Dumbbell,
  },
  {
    title: 'Plantillas',
    valueKey: 'total_templates' as const,
    icon: ClipboardList,
  },
  {
    title: 'Asignaciones',
    valueKey: 'total_active_workouts' as const,
    icon: ClipboardCheck,
  },
]

const QUICK_ACTIONS = [
  {
    title: 'Crear cliente',
    icon: UserPlus,
    href: 'clients/create',
  },
  {
    title: 'Crear ejercicio',
    icon: Dumbbell,
    href: 'exercises/create',
  },
  {
    title: 'Crear plantilla de rutina',
    icon: FilePlus,
    href: 'templates/create',
  },
]

export default function CoachDashboard() {
  const { data, isLoading, error } = useDashboard()

  const stats: Stats | undefined = data?.stats
  const recentUsers: RecentUser[] = data?.recent ?? []
  const hasStats = Boolean(stats && Object.values(stats).some((value) => value > 0))

  if (isLoading) {
    return <DashboardSkeleton />
  }

  if (error) {
    return (
      <Page>
        <Container className='py-8'>
          <Text>Ocurrió un error al obtener los datos. Intenta nuevamente más tarde.</Text>
        </Container>
      </Page>
    )
  }

  return (
    <Page>
      <Container className='space-y-12 py-0'>
        <section className='space-y-4'>
          <H2 className='text-xl'>Resumen</H2>

          <div className='grid md:grid-cols-4 gap-5'>
            {STAT_CARDS.map((card) => (
              <StatsCard
                key={card.title}
                title={card.title}
                value={stats?.[card.valueKey] ?? 0}
                icon={card.icon}
              />
            ))}
          </div>

          {!hasStats ? (
            <div className='rounded-lg border p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
              <Text className='text-muted-foreground'>
                Aún no hay actividad para mostrar en el resumen. Empieza creando tu primer cliente.
              </Text>
              <Button asChild size='sm'>
                <Link href='/coach/clients/create'>Crear primer cliente</Link>
              </Button>
            </div>
          ) : null}
        </section>

        <section className='space-y-4'>
          <H2 className='text-xl font-display'>Acciones rápidas</H2>

          <div className='grid md:grid-cols-3 gap-5'>
            {QUICK_ACTIONS.map((action) => (
              <QuickAction
                key={action.title}
                title={action.title}
                icon={action.icon}
                href={action.href}
              />
            ))}
          </div>
        </section>

        <section className='space-y-4'>
          <div className='flex items-center justify-between'>
            <H2 className='text-xl font-display'>Clientes recientes</H2>
            <Button asChild variant='ghost' size='sm'>
              <Link href='/coach/clients'>Ver todos</Link>
            </Button>
          </div>

          <RecentClients clients={recentUsers} isLoading={isLoading} />
        </section>
      </Container>
    </Page>
  )
}
