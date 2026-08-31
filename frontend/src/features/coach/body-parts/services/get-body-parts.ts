import api from "@/lib/api";

export async function getBodyParts() {
    const response = await api.get("/body-parts");
    return response.data;
}