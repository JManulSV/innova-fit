import api from "@/lib/api";

export async function getBodyParts() {
    const response = await api.get("/api/body-parts");
    return response.data;
}