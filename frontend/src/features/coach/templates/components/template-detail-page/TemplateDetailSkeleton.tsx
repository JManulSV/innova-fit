import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function TemplateDetailSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <div className="h-8 w-40 rounded-md bg-muted" />

      <Card className="border-border bg-card">
        <CardHeader className="space-y-4 border-b border-border pb-5">
          <div className="flex flex-wrap gap-2">
            <div className="h-5 w-36 rounded-full bg-muted" />
            <div className="h-5 w-24 rounded-full bg-muted" />
          </div>
          <div className="space-y-3">
            <div className="h-10 w-2/3 rounded-md bg-muted" />
            <div className="h-4 w-full rounded-md bg-muted" />
            <div className="h-4 w-5/6 rounded-md bg-muted" />
          </div>
        </CardHeader>

        <CardContent className="space-y-3 pt-5">
          <div className="h-4 w-48 rounded-md bg-muted" />
          <div className="h-4 w-40 rounded-md bg-muted" />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index} className="border-border bg-card">
            <CardContent className="space-y-3 py-5">
              <div className="h-3 w-24 rounded-md bg-muted" />
              <div className="h-8 w-20 rounded-md bg-muted" />
              <div className="h-3 w-32 rounded-md bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="grid grid-cols-[auto_1fr] gap-3 md:gap-4">
            <div className="h-10 w-10 rounded-full bg-muted" />
            <Card className="border-border bg-card">
              <CardContent className="space-y-4 py-4">
                <div className="h-6 w-1/2 rounded-md bg-muted" />
                <div className="h-4 w-full rounded-md bg-muted" />
                <div className="h-4 w-3/4 rounded-md bg-muted" />
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}