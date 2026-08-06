"use client";

import { useMemo, useState } from "react";

import type { Client } from "../../clients/types/clients.types";
import { buildClientStatus } from "../pages/components/utils";
import type { ClientFilter, ClientItem } from "./types";

interface UseAssignedRoutineClientsParams {
  clients: Client[];
  isLoadingClients: boolean;
}

export function useAssignedRoutineClients({ clients, isLoadingClients }: UseAssignedRoutineClientsParams) {
  const [selectedClientIds, setSelectedClientIds] = useState<number[]>([]);
  const [clientFilter, setClientFilter] = useState<ClientFilter>("all");
  const [clientSearch, setClientSearch] = useState("");

  const clientItems = useMemo(
    () =>
      clients
        .map((client): ClientItem => ({
          client,
          status: buildClientStatus(client),
        }))
        .filter(({ client, status }) => {
          const query = clientSearch.trim().toLowerCase();
          const haystack = `${client.name} ${client.email}`.toLowerCase();
          const matchesQuery = !query || haystack.includes(query);
          const matchesFilter = clientFilter === "all" || status.label.toLowerCase() === clientFilter;

          return matchesQuery && matchesFilter;
        }),
    [clientFilter, clientSearch, clients],
  );

  const toggleClient = (clientId: number) => {
    setSelectedClientIds((current) =>
      current.includes(clientId) ? current.filter((id) => id !== clientId) : [...current, clientId],
    );
  };

  return {
    clients: {
      selectedClientIds,
      clientFilter,
      clientSearch,
      clientItems,
    },
    submission: {
      isLoadingClients,
    },
    actions: {
      onClientToggle: toggleClient,
      onClientFilterChange: setClientFilter,
      onClientSearchChange: setClientSearch,
    },
  } as const;
}
