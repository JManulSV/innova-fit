'use client'

import { Button } from '@/components/ui/button'

type ErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Error inesperado
      </p>
      <h1 className="mt-3 text-2xl font-semibold">
        Falló el detalle del cliente
      </h1>
      <p className="mt-2 max-w-xl text-sm text-muted-foreground">
        {error.message}
      </p>

      <div className="mt-6 flex gap-3">
        <Button onClick={() => reset()}>
          Reintentar
        </Button>
      </div>
    </div>
  )
}