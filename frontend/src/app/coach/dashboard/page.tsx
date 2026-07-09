import { Container } from '@/components/layout/container'
import { Page } from '@/components/layout/page'
import { H2, Text } from '@/components/typography'
import { Button } from '@/components/ui/button'
import QuickAction from '@/features/coach/dashboard/components/QuickAction'
import RecentClients from '@/features/coach/dashboard/components/RecentClients'
import StatsCard from '@/features/coach/dashboard/components/StatsCard'
import { ClipboardCheck, ClipboardList, Dumbbell, FilePlus, UserPlus, Users } from 'lucide-react'
import Link from 'next/link'

export default function CoachDashboard() {
  return (
    <Page>
      <Container className='space-y-12 py-0'>
        <section className='space-y-4'>
          <H2 className='text-xl'>Resumen</H2>
          <div className='grid md:grid-cols-4 gap-5'>
           <StatsCard
              title="Clientes"
              value="128"
              icon={Users}
            />

            <StatsCard
              title="Ejercicios"
              value="342"
              icon={Dumbbell}
            />

            <StatsCard
              title="Plantillas"
              value="24"
              icon={ClipboardList}
            />

            <StatsCard
              title="Asignaciones"
              value="342"
              icon={ClipboardCheck}
            />

          </div>
        </section>

        <section className='space-y-4'>
          <H2 className='text-xl font-display'>Acciones rápidas</H2>
          <div className='grid md:grid-cols-3 gap-5'>
            <QuickAction
                title="Crear cliente"
                icon={UserPlus}
                href='clients/create'
              />

              <QuickAction
                title="Crear ejercicio"
                icon={Dumbbell}
                href="exercises/create"
              />

              <QuickAction
                title="Crear plantilla de rutina"
                icon={FilePlus}
                href='templates/create'
              />
              
          </div>
        </section>

        <section className='space-y-4'>
          <div className="flex items-center justify-between">
            <H2 className='text-xl font-display'>Clientes recientes</H2>
            <Button
              asChild
              variant="ghost"
              size="sm"
            >
              <Link href="/coach/clients">
                Ver todos
              </Link>
            </Button>
        </div>
          <RecentClients />
        </section>
      </Container>
    </Page>
  )
}
