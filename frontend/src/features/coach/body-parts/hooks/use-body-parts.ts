import { useQuery } from "@tanstack/react-query";
import { getBodyParts } from "../services/get-body-parts";

export function useBodyParts() {
    return useQuery({
        queryKey: ["body-parts"],
        queryFn: getBodyParts,
        select: (data) => data.data,
    });
}