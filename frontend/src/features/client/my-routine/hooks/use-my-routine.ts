import { useQuery } from "@tanstack/react-query";
import { getMyRoutines } from "../service/get-my-routines";

export function useMyRoutines(){
    return useQuery({
        queryKey: ["my-routines"],
        queryFn: getMyRoutines,
        select: (response) => response.data,
    });
}