import { useMutation } from "@tanstack/react-query";
import { assignRoutine } from "../services/assign-routine";

export function useAssignedRoutine(){
    return useMutation({
        mutationFn: assignRoutine
    })
}
