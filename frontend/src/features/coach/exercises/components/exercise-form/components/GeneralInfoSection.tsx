import { UseFormRegister } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Mono } from '@/components/typography'
import { ExerciseFormValues } from '../../../schemas/exercise.schema'
import { AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Props {
  register: UseFormRegister<ExerciseFormValues>
  errors: any
}

export default function GeneralInfoSection({ register, errors }: Props) {
  return (
    <Card className="p-4">
      <Mono className="text-muted-foreground">Información general</Mono>
      <div className="grid gap-2">
        <label className="text-sm font-medium">Nombre del ejercicio</label>
        <Input 
          className={cn("dark:bg-background", errors.name && "border-destructive focus:border-destructive focus:ring-destructive")}
          {...register('name', { required: true })} 
          placeholder="Ej. Press de banca con barra" 
        />
        {errors.name && (
          <div className="flex items-center gap-1 mt-1 text-xs text-destructive">
            <AlertCircle className="h-3 w-3" />
            <span>{errors.name?.message}</span>
          </div>
        )}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium">Descripción</label>
        <textarea
          {...register('description')}
          rows={4}
          className="w-full rounded-md border p-2 bg-transparent text-sm dark:bg-background"
          placeholder="Breve descripción del ejercicio y su objetivo..."
        />
      </div>
    </Card>
  )
}
