import { Container } from '@/components/layout/container';
import { Page } from '@/components/layout/page';
import { H2 } from '@/components/typography';
import QuickActionSkeleton from './QuickActionSkeleton';
import RecentClientsSkeleton from './RecentClientsSkeleton';
import StatsCardSkeleton from './StatsCardSkeleton';

export default function DashboardSkeleton() {
  return (
    <Page>
      <Container className="space-y-12 py-0">
        <section className="space-y-4">
          <H2 className="text-xl">Resumen</H2>

          <div className="grid md:grid-cols-4 gap-5">
            {Array.from({ length: 4 }, (_, index) => (
              <StatsCardSkeleton key={index} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <H2 className="text-xl font-display">Acciones rápidas</H2>

          <div className="grid md:grid-cols-3 gap-5">
            {Array.from({ length: 3 }, (_, index) => (
              <QuickActionSkeleton key={index} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <H2 className="text-xl font-display">Clientes recientes</H2>
          </div>

          <RecentClientsSkeleton />
        </section>
      </Container>
    </Page>
  );
}
