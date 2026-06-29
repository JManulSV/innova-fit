import api from "@/lib/api";
import { AssignRoutineRequest } from "../types";

interface AssignRoutineParams{
    id: string,
    data: AssignRoutineRequest,
}

export const assignRoutine = async ({id, data}: AssignRoutineParams) => {
    const response = await api.post(`/api/clients/${id}/assigned-routines`, data);
    return response.data;
}