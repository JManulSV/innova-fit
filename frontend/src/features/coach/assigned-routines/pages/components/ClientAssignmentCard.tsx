"use client";

import { Check, ListFilter, Search } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { formatDate, getClientInitials } from "./utils";
import type { ClientFilter, ClientItem } from "./types";

interface Props {
  clientItems: ClientItem[];
  selectedClientIds: number[];
  clientFilter: ClientFilter;
  clientSearch: string;
  isLoadingClients: boolean;
  onClientToggle: (clientId: number) => void;
  onClientFilterChange: (filter: ClientFilter) => void;
  onClientSearchChange: (value: string) => void;
}

export default function ClientAssignmentCard({ clientItems, selectedClientIds, clientFilter, clientSearch, isLoadingClients, onClientToggle, onClientFilterChange, onClientSearchChange }: Props) {
  return (
    <Card className="border-border bg-card text-card-foreground">
      <CardHeader>
        <CardTitle>Asignar a clientes</CardTitle>
        <CardDescription>Selecciona quién recibirá esta rutina.</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_180px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input value={clientSearch} onChange={(event) => onClientSearchChange(event.target.value)} placeholder="Buscar cliente por nombre..." className="h-11 pl-10" />
            </div>

            <div className="flex gap-2 overflow-auto pb-1">
              {([
                ["all", "Todos"],
                ["active", "Activos"],
                ["new", "Nuevos"],
                ["paused", "Pausados"],
              ] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => onClientFilterChange(value)} className={cn("inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm transition-colors", clientFilter === value ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted/30")}>
                  <ListFilter className="size-3.5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {isLoadingClients ? (
              <div className="col-span-full rounded-3xl border border-dashed border-border/70 px-6 py-16 text-center text-sm text-muted-foreground">Cargando clientes...</div>
            ) : clientItems.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-dashed border-border/70 px-6 py-16 text-center text-sm text-muted-foreground">No hay clientes para mostrar.</div>
            ) : (
              clientItems.map(({ client, status }) => {
                const selected = selectedClientIds.includes(client.id);

                return (
                  <button key={client.id} type="button" onClick={() => onClientToggle(client.id)} className="rounded-2xl border border-border bg-card p-4 text-left transition-colors hover:bg-muted/30">
                    <div className="flex items-start gap-3">
                      <Avatar className="size-10">
                        <AvatarFallback>{getClientInitials(client.name)}</AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <p className="truncate font-medium">{client.name}</p>
                          <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium", status.tone)}>{status.label}</span>
                        </div>
                        <p className="truncate text-sm text-muted-foreground">{client.email}</p>
                        <p className="mt-2 text-xs text-muted-foreground">Registrado: {formatDate(String(client.created_at))}</p>
                      </div>

                      <div className={cn("flex size-6 items-center justify-center rounded-full border", selected ? "border-primary bg-primary text-primary-foreground" : "border-border text-transparent")}>
                        <Check className="size-3.5" />
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
