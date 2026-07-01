import api from "@/lib/api";

export const deleteExercise = async (id: string) => {
    const response = await api.delete(`/api/exercises/${id}`);
    return response.data;
};