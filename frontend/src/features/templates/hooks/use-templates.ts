import { useQuery } from "@tanstack/react-query";
import { getTemplates } from "../services/get-templates";

export function useTemplates() {
    return useQuery({
        "queryKey": ["templates"],
        "queryFn": getTemplates
    })
}