import api from "@/lib/api";

export const getExercises = async () => {
    const response = await api.get('/api/exercises');
    return response.data;
};