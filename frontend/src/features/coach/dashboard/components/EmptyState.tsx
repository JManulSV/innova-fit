import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { H2, Text } from '@/components/typography'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel?: string
  actionHref?: string
}

export default function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: EmptyStateProps) {
  return (
    <Card className='rounded-lg border p-6'>
      <div className='space-y-3'>
        <H2 className='text-lg'>{title}</H2>
        <Text className='text-sm text-muted-foreground'>{description}</Text>
        {actionLabel && actionHref ? (
          <Button asChild size='sm'>
            <Link href={actionHref}>{actionLabel}</Link>
          </Button>
        ) : null}
      </div>
    </Card>
  )
}
