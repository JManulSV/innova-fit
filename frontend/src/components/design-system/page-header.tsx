import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme/theme-toggle";

export function PageHeader() {
  return (
    <section className="flex flex-col gap-6 border-b pb-8 md:flex-row md:items-center md:justify-between">
      <div>
        <Badge variant="secondary">v0.1</Badge>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Innova-Fit Design System
        </h1>

        <p className="mt-2 max-w-2xl text-muted-foreground">
          Laboratorio para validar componentes, tokens y patrones visuales.
        </p>
      </div>

      <ThemeToggle />
    </section>
  );
}