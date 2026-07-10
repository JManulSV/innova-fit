import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../service/get-dashboard";

export function useDashboard(){
    return useQuery({
        queryKey: ['dashboard'],
        queryFn: getDashboard,
        select: (response) => response.data,
    });
}