import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react';

interface Props {
  isLoading: boolean,
  type?: 'create' | 'edit',
}

export default function FormActions({ isLoading, type }: Props) {
  const router = useRouter()
  const submitButtonText = useMemo(() => {
      if (type === 'create') {
        return isLoading ? 'Creando...' : 'Crear Ejercicio'
      }
      if (type === 'edit') {
        return isLoading ? 'Actualizando...' : 'Actualizar Ejercicio'
      }
      return 'Enviar'
    }, [type, isLoading]);
  return (
    <div className="flex items-center justify-end gap-3">
      <Button type="button" variant="outline" size={'lg'} onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit" size={'lg'} disabled={isLoading}>
        {submitButtonText}
      </Button>
    </div>
  )
}
