"use client"
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { XCircle } from 'lucide-react'
import { Mono } from '@/components/typography'

interface Props {
  error?: any
  onRetry?: () => void
}

export default function ExerciseFormError({ error, onRetry }: Props) {
  const message = String(error?.message ?? error ?? 'Ocurrió un error. Intenta nuevamente.')

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card className="p-4">
        <div className="flex items-start gap-4">
          <XCircle className="h-6 w-6 text-destructive" />
          <div className="flex-1">
            <Mono className="text-destructive">Error al cargar el ejercicio</Mono>
            <p className="text-sm text-muted-foreground mt-1 wrap-break-word">{message}</p>
            <div className="mt-3 flex gap-2">
              <Button variant="outline" onClick={() => (onRetry ? onRetry() : window.location.reload())}>
                Reintentar
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
