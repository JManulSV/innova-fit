import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

interface Props {
  isLoading: boolean
}

export default function FormActions({ isLoading }: Props) {
  const router = useRouter()
  return (
    <div className="flex items-center justify-end gap-3">
      <Button type="button" variant="outline" size={'lg'} onClick={() => router.back()}>
        Cancelar
      </Button>
      <Button type="submit" size={'lg'} disabled={isLoading}>
        {isLoading ? 'Guardando...' : 'Guardar ejercicio'}
      </Button>
    </div>
  )
}
