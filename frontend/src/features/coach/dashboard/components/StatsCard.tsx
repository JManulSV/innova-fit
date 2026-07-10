import { Muted } from "@/components/typography"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface StatsCardProps{
    title: string,
    value: number
    icon: LucideIcon
}

export default function StatsCard({title, icon: Icon, value}:StatsCardProps) {
  return (
    <Card className="p-4 hover:border-accent-foreground hover:border">
        <div className="flex justify-between items-center">
            <Muted>{title}</Muted>
            <Icon className="text-muted-foreground" />
        </div>
        <span className="text-2xl">{value}</span>
        <div className="mt-3 h-0.5 rounded-full bg-accent-foreground"></div>
    </Card>
  )
}
