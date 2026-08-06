import type { Client } from "../../clients/types/clients.types";

export type WizardStep = 1 | 2;
export type ClientFilter = "all" | "active" | "new" | "paused";
export type RepeatMode = "once" | "weekly" | "custom";

export type ClientStatus = {
  label: string;
  tone: string;
};

export type ClientItem = {
  client: Client;
  status: ClientStatus;
};
