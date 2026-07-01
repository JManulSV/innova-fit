import { useQuery } from "@tanstack/react-query";
import { getMyRoutine } from "../service/get-my-routine";

export function useMyRoutine(id: string) {
    return useQuery({
        queryKey: ["my-routine", id],
        queryFn: () => getMyRoutine(id),
        select: (response) => response.data,
    })
}
