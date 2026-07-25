import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Mono } from '@/components/typography'
import DEFAULT_MUSCLE_GROUPS from '../constants'

interface Props {
  selectedGroups: string[]
  onToggle: (g: string) => void
  customGroup: string
  onCustomChange: (v: string) => void
  onAddCustom: () => void
}

export default function MuscleGroupsSection({ selectedGroups, onToggle, customGroup, onCustomChange, onAddCustom }: Props) {
  return (
    <Card className="p-4">
      <div className="grid gap-2">
        <label className="text-sm font-medium"><Mono className="text-muted-foreground">Grupos musculares</Mono></label>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_MUSCLE_GROUPS.map((g) => {
            const active = selectedGroups.includes(g)
            return (
              <button
                type="button"
                key={g}
                onClick={() => onToggle(g)}
                aria-pressed={active}
                className={`rounded-full px-3 py-1 text-sm border dark:bg-background ${
                  active
                    ? 'dark:bg-primary dark:text-primary-foreground bg-primary text-primary-foreground'
                    : 'bg-muted/10'
                }`}
              >
                {g}
              </button>
            )
          })}
        </div>

        <div className="flex gap-2 mt-2">
          <Input className="dark:bg-background" value={customGroup} onChange={(e) => onCustomChange(e.target.value)} placeholder="Agregar grupo muscular personalizado" />
          <Button type="button" onClick={onAddCustom}>
            Añadir
          </Button>
        </div>
      </div>
    </Card>
  )
}
