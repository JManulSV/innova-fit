import { Card } from '@/components/ui/card'
import { Mono } from '@/components/typography'
import type { BodyPart } from '../../../../body-parts/types/body-parts'

interface Props {
  bodyParts: BodyPart[]
  selectedBodyPartIds: number[]
  onToggle: (bodyPartId: number) => void
}

export default function BodyPartsSection({ bodyParts, selectedBodyPartIds, onToggle }: Props) {
  return (
    <Card className="p-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium">
          <Mono className="text-muted-foreground">Partes del cuerpo</Mono>
        </label>

        <div className="flex flex-wrap gap-2">
          {bodyParts.map((bodyPart) => {
            const active = selectedBodyPartIds.includes(bodyPart.id)

            return (
              <button
                key={bodyPart.id}
                type="button"
                onClick={() => onToggle(bodyPart.id)}
                aria-pressed={active}
                className={`rounded-full border px-3 py-1 text-sm dark:bg-background ${
                  active
                    ? 'bg-primary text-primary-foreground dark:bg-primary dark:text-primary-foreground'
                    : 'bg-muted/10'
                }`}
              >
                {bodyPart.name}
              </button>
            )
          })}
        </div>
      </div>
    </Card>
  )
}
