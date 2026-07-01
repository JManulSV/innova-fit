import api from "@/lib/api";

export async function getMyRoutine(id: string) {
    const response = await api.get(`/api/my-routines/${id}`);
    return response.data;
}