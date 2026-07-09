import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface QuickActionsProps{
    title: string;
    icon: LucideIcon,
    href: string;
}

export default function QuickAction({href, title, icon:Icon}:QuickActionsProps) {
  return (
    <Link
      href={href}
      className="block rounded-md transition hover:border hover:border-accent-foreground"
    >
      <Card className="flex flex-row items-center gap-4 p-6">
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium">{title}</span>
      </Card>
    </Link>
  )
}