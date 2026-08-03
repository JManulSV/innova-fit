"use client"
import { Card } from '@/components/ui/card'
import { Page } from '@/components/design-system/page'

export default function ExerciseFormSkeleton() {
  return (
    <Page className="relative p-2 overflow-hidden">
        <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 lg:px-8">
            <div className="animate-pulse space-y-6 w-full">
            <Card className="p-4">
                <div className="space-y-3">
                <div className="h-4 w-40 bg-muted rounded-md" />
                <div className="h-10 w-full bg-muted rounded-md" />
                <div className="h-24 w-full bg-muted rounded-md mt-2" />
                </div>
            </Card>

            <Card className="p-4">
                <div className="space-y-3">
                <div className="h-4 w-36 bg-muted rounded-md" />
                <div className="h-36 w-full bg-muted rounded-md" />
                </div>
            </Card>

            <Card className="p-4">
                <div className="space-y-3">
                <div className="h-4 w-48 bg-muted rounded-md" />
                <div className="flex flex-wrap gap-2">
                    <div className="h-8 w-20 bg-muted rounded-full" />
                    <div className="h-8 w-20 bg-muted rounded-full" />
                    <div className="h-8 w-20 bg-muted rounded-full" />
                    <div className="h-8 w-20 bg-muted rounded-full" />
                    <div className="h-8 w-20 bg-muted rounded-full" />
                </div>

                <div className="flex gap-2 mt-2">
                    <div className="h-10 flex-1 bg-muted rounded-md" />
                    <div className="h-10 w-24 bg-muted rounded-md" />
                </div>
                </div>
            </Card>

            <div className="flex items-center justify-end gap-3">
                <div className="h-10 w-28 bg-muted rounded-md" />
                <div className="h-10 w-44 bg-muted rounded-md" />
            </div>
            </div>
        </div>
    </Page>
  )
}
