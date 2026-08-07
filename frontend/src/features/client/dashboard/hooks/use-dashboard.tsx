import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../services/get-dashboard";

export function useDashboard() {
  return useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });
}