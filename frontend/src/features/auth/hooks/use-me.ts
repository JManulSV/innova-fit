import { useQuery } from "@tanstack/react-query";
import { getMe } from "../services/me";

export function useMe() {
    return useQuery({
        queryKey: ['me'],
        queryFn: getMe,
        retry: false,
    });
}