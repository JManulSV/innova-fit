import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function DesignSystemPage() {
  return (
    <main className="min-h-screen bg-background p-10">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* Header */}

        <section className="flex items-center justify-between">
            <div>
                <h1 className="text-4xl font-bold text-foreground">
                Innova-Fit Design System
                </h1>

                <p className="mt-2 text-muted-foreground">
                Laboratorio de componentes y tokens.
                </p>
            </div>

            <ThemeToggle />
        </section>

        {/* Buttons */}

        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
            <CardDescription>
              Variantes principales del botón.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-wrap gap-4">
            <Button>Primary</Button>

            <Button variant="secondary">
              Secondary
            </Button>

            <Button variant="outline">
              Outline
            </Button>

            <Button variant="ghost">
              Ghost
            </Button>

            <Button variant="destructive">
              Delete
            </Button>
          </CardContent>
        </Card>

        {/* Inputs */}

        <Card>
          <CardHeader>
            <CardTitle>Inputs</CardTitle>
          </CardHeader>

          <CardContent className="max-w-md">
            <Input placeholder="Correo electrónico" />
          </CardContent>
        </Card>

        {/* Badges */}

        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>

          <CardContent className="flex gap-3">
            <Badge>Default</Badge>

            <Badge variant="secondary">
              Secondary
            </Badge>

            <Badge variant="outline">
              Outline
            </Badge>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}