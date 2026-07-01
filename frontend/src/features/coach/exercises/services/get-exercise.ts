import api from "@/lib/api";

export const getExercise = async (id: string) => {
    const response = await api.get(`/api/exercises/${id}`);
    return response.data;
}