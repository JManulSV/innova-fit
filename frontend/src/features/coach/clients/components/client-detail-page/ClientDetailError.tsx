import { Container } from '@/components/layout/container'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'

type ClientDetailErrorProps = {
  message?: string
  onRetry: () => void
}

export default function ClientDetailError({
  message = 'No se pudo cargar la información del cliente.',
  onRetry,
}: ClientDetailErrorProps) {
  return (
    <Page className='p-1'>
      <Container>
        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Error del servidor
          </p>
          <h1 className="mt-3 text-2xl font-semibold">
            No pudimos mostrar este cliente
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            {message}
          </p>

          <div className="mt-6 flex gap-3">
            <Button onClick={onRetry}>
              Reintentar
            </Button>
          </div>
        </div>
      </Container>
    </Page>
  )
}