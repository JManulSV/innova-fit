import { z } from "zod";

export const clientsFiltersSchema = z.object({
  search: z.string().trim().default(""),
  status: z.enum(["all", "active", "inactive"]).default("all"),
});

export type ClientsFilters = z.infer<typeof clientsFiltersSchema>;
