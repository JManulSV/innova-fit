import type { ReactNode } from 'react'
import { Sparkles } from 'lucide-react'

import { cn } from '@/lib/utils'

type ComingSoonCardProps = {
  badgeLabel?: string
  title: string
  description: string
  highlights?: string[]
  previewLabel?: string
  previewTitle?: string
  icon?: ReactNode
  className?: string
}

export function ComingSoonCard({
  badgeLabel = 'En desarrollo',
  title,
  description,
  highlights = [],
  previewLabel = 'Vista previa',
  previewTitle = title,
  icon = <Sparkles className='h-6 w-6' />,
  className,
}: ComingSoonCardProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-[0_24px_80px_-32px_rgba(15,23,42,0.22)] sm:p-8',
        className,
      )}
    >
      <div className='pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_38%),radial-gradient(circle_at_bottom_left,rgba(16,185,129,0.10),transparent_34%)]' />

      <div className='relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center'>
        <div className='space-y-6'>
          <div className='inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary'>
            <span className='h-2 w-2 rounded-full bg-primary' />
            {badgeLabel}
          </div>

          <div className='space-y-3'>
            <h2 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>{title}</h2>
            <p className='max-w-xl text-base leading-7 text-muted-foreground sm:text-lg'>{description}</p>
          </div>

          {highlights.length > 0 ? (
            <div className='flex flex-wrap gap-3'>
              {highlights.map((item) => (
                <span
                  key={item}
                  className='rounded-full border border-border bg-background px-4 py-2 text-sm font-medium text-foreground shadow-sm'
                >
                  {item}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        <div className='relative'>
          <div className='rounded-2xl border border-border bg-background/80 p-6 shadow-lg backdrop-blur-sm'>
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-muted-foreground'>{previewLabel}</p>
                <p className='text-xl font-semibold text-foreground'>{previewTitle}</p>
              </div>

              <div className='flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary'>
                {icon}
              </div>
            </div>

            <div className='space-y-4'>
              <div className='rounded-xl border border-border bg-card px-4 py-4'>
                <div className='mb-2 h-2 w-24 rounded-full bg-primary/20' />
                <div className='h-3 w-3/4 rounded-full bg-muted' />
                <div className='mt-3 h-3 w-1/2 rounded-full bg-muted/70' />
              </div>

              <div className='grid grid-cols-3 gap-3'>
                <div className='rounded-xl border border-border bg-card px-3 py-4 text-center'>
                  <p className='text-xs uppercase tracking-wide text-muted-foreground'>Estado</p>
                  <p className='mt-2 text-sm font-semibold text-foreground'>Listo</p>
                </div>
                <div className='rounded-xl border border-border bg-card px-3 py-4 text-center'>
                  <p className='text-xs uppercase tracking-wide text-muted-foreground'>Seguimiento</p>
                  <p className='mt-2 text-sm font-semibold text-foreground'>Activo</p>
                </div>
                <div className='rounded-xl border border-border bg-card px-3 py-4 text-center'>
                  <p className='text-xs uppercase tracking-wide text-muted-foreground'>Progreso</p>
                  <p className='mt-2 text-sm font-semibold text-foreground'>-</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}