import { H2, Mono, Text } from '@/components/typography'
import { Card } from '@/components/ui/card'

interface ExerciseDetailsTitleProps {
    title?: string
    description?: string
    instructions?: string
}

function ExerciseDetailMain({ title, description, instructions }: ExerciseDetailsTitleProps) {
  return (
    <div>
      <Card className="flex flex-col items-start gap-3 p-4">
        <H2>{title}</H2>
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
