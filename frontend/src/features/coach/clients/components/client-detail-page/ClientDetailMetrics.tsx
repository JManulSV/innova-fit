import { Card } from '@/components/ui/card';
import { H2, Mono } from '@/components/typography';
import { CheckCircleIcon, Clock, Flame, TrendingUp } from 'lucide-react';
import type { ReactNode } from 'react';

const ClientDetailMetricsData = [
  {
    title: 'Adherencia',
    value: '85%',
    icon: <TrendingUp aria-hidden="true" />,
  },
  {
    title: 'Completadas',
    value: '23',
    icon: <CheckCircleIcon aria-hidden="true" />,
  },
  {
    title: 'Racha actual',
    value: '5 días',
    icon: <Flame aria-hidden="true" />,
  },
  {
    title: 'Última sesión',
    value: 'Hace 2 días',
    icon: <Clock aria-hidden="true" />,
  },
];

interface ClientDetailMetricsProps {
  createAt: string;
}

export default function ClientDetailMetrics({ createAt }: ClientDetailMetricsProps) {
  return (
    <section className="pt-4">
        <Mono className='text-xs text-muted-foreground'>CLIENTE DESDE {new Date(createAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase()}</Mono>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mt-4">
        {ClientDetailMetricsData.map((metric) => (
            <ClientDetailMetricsCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            />
        ))}
        </div>
    </section>
  );
}

type ClientDetailMetricsCardProps = {
  title: string;
  value: string;
  icon: ReactNode;
};

function ClientDetailMetricsCard({ title, value, icon }: ClientDetailMetricsCardProps) {
  return (
    <Card className="border border-border bg-card p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex gap-4 items-center">
            <span className="text-primary h-5 w-5">{icon}</span>
            <Mono className="text-xs text-muted-foreground uppercase tracking-[0.18em]">{title}</Mono>
        </div>

      <div>
        <H2 className="text-xl">{value}</H2>
      </div>
    </Card>
  );
}
