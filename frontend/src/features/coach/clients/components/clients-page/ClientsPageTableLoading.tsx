import { TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ClientsPageTableLoading() {
  return (
    <>
      <TableHeader>
        <TableRow className="bg-background">
          <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
            Cliente
          </TableHead>
          <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
            Plantilla asignada
          </TableHead>
          <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground">
            Última actividad
          </TableHead>
          <TableHead className="px-4 py-3 text-xs font-medium uppercase tracking-[0.02em] text-muted-foreground text-right">
            Estado
          </TableHead>
          <TableHead className="px-4 py-3" />
        </TableRow>
      </TableHeader>

      <TableBody>
        {[1, 2, 3].map((item) => (
          <TableRow key={item} className="animate-pulse">
            <TableCell className="px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-muted" />
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-muted" />
                  <div className="h-3 w-32 rounded bg-muted" />
                </div>
              </div>
            </TableCell>
            <TableCell className="px-4 py-4">
              <div className="h-4 w-24 rounded bg-muted" />
            </TableCell>
            <TableCell className="px-4 py-4">
              <div className="h-4 w-28 rounded bg-muted" />
            </TableCell>
            <TableCell className="px-4 py-4 text-right">
              <div className="ml-auto h-6 w-20 rounded-full bg-muted" />
            </TableCell>
            <TableCell className="px-4 py-4 text-right">
              <div className="ml-auto h-8 w-8 rounded-md bg-muted" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}
