import { ColorPalette } from "@/components/design-system/color-palette";
import { PageHeader } from "@/components/design-system/page-header";
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
      <div className="mx-auto max-w-7xl space-y-12">

        {/* Header */}
        {<PageHeader />}

        {/* Color Palette */}
        <ColorPalette />

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