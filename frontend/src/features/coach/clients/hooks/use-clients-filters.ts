"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { parseClientsFilters, serializeClientsFilters } from "../filters/clients-filters";
import type { ClientsFilters } from "../filters/clients-filters.schema";

export function useClientsFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filter = useMemo<ClientsFilters>(() => {
    return parseClientsFilters({
      search: searchParams.get("filter[search]"),
      status: searchParams.get("filter[status]"),
    });
  }, [searchParams]);

  const updateFilter = (next: Partial<ClientsFilters>) => {
    const merged: ClientsFilters = {
      ...filter,
      ...next,
    };

    const query = serializeClientsFilters(merged);
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  };

  return { filter, setFilter: updateFilter };
}
