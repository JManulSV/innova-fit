import api from "@/lib/api";

export async function getMyRoutines(){
    const response = await api.get('/api/my-routines');
    return response.data;
}