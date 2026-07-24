import { H2, Mono, Text } from '@/components/typography'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dumbbell } from 'lucide-react'

interface ExerciseDetailsTitleProps {
    title?: string
    bodyPart?: string
    description?: string
    instructions?: string
}

function ExerciseDetailMain({ title, bodyPart, description, instructions }: ExerciseDetailsTitleProps) {
  return (
    <div>
      <Card className="flex flex-col items-start gap-3 p-4">
        <H2>{title}</H2>
        <Badge variant={'outline'} className="text-primary">
          <Dumbbell className="h-6 w-6" />
          {bodyPart?.toUpperCase()}
        </Badge>
      </Card>

      <Card className="flex flex-col items-start gap-3 p-4 mt-6">
        <Mono className="text-muted-foreground">Descripción</Mono>
        <Text>{description}</Text>
      </Card>

      <Card className="flex flex-col items-start gap-3 p-4 mt-6">
        <Mono className="text-muted-foreground">Instrucciones</Mono>
        <Text>{instructions}</Text>
      </Card>
    </div>
  )
}

export default ExerciseDetailMain