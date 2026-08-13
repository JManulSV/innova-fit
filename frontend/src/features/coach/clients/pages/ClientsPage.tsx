"use client";

import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ClientsPageFilterBar from "../components/clients-page/ClientsPageFilterBar";
import ClientsPageHeader from "../components/clients-page/ClientsPageHeader";
import ClientsPageSkeleton from "../components/clients-page/ClientsPageSkeleton";
import ClientsPageTable from "../components/clients-page/ClientsPageTable";
import { useClients } from "../hooks/use-clients";
import { Container } from "@/components/design-system/container";
import { Stack } from "@/components/design-system/stack";
import type { ClientsFilters } from "../types/clients.types";

function ClientsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filter, setFilter] = useState<ClientsFilters>(() => ({
    search: searchParams.get("search") ?? "",
    status: (searchParams.get("status") as ClientsFilters["status"]) ?? "all",
  }));

  useEffect(() => {
    const next = new URLSearchParams();

    if (filter.search.trim()) {
      next.set("search", filter.search.trim());
    }

    if (filter.status !== "all") {
      next.set("status", filter.status);
    }

    const nextQuery = next.toString();
    const currentQuery = searchParams.toString();

    if (nextQuery !== currentQuery) {
      const url = nextQuery ? `${pathname}?${nextQuery}` : pathname;
      router.replace(url, { scroll: false });
    }
  }, [filter, pathname, router, searchParams]);

  const debouncedSearch = useDebounce(filter.search.trim(), 300);
  const { data, isPending, isFetching } = useClients({
    ...filter,
    search: debouncedSearch,
  });

  const clients = data?.data || [];
  const showInitialSkeleton = isPending && !data;
  const showRefreshingState = isFetching && !!data;

  return (
    <Container>
      <Stack>
        {showInitialSkeleton ? (
          <ClientsPageSkeleton />
        ) : (
          <>
            <ClientsPageHeader clientCount={clients.length} />
            <div className="space-y-6">
              <ClientsPageFilterBar filter={filter} setFilter={setFilter} />

              {showRefreshingState && (
                <div className="flex items-center justify-center rounded-md border border-dashed border-muted-foreground/30 bg-muted/20 px-3 py-2 text-sm text-muted-foreground">
                  Actualizando clientes...
                </div>
              )}

              <ClientsPageTable clients={clients} isLoading={showRefreshingState} />
            </div>
          </>
        )}
      </Stack>
    </Container>
  );
}

export default ClientsPage;