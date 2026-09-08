import { clientsFiltersSchema, type ClientsFilters } from "./clients-filters.schema";

type SearchParamsInput = {
  search?: string | null;
  status?: string | null;
};

export function parseClientsFilters(input: SearchParamsInput): ClientsFilters {
  return clientsFiltersSchema.parse({
    search: input.search ?? "",
    status: input.status ?? "all",
  });
}

export function serializeClientsFilters(filters: ClientsFilters) {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("filter[search]", filters.search.trim());
  }

  if (filters.status !== "all") {
    params.set("filter[status]", filters.status);
  }

  return params.toString();
}
