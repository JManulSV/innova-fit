import api from "@/lib/api";
import { CreateClientRequest } from "../types/clients.types";

export async function createClient(data: CreateClientRequest) {
    const response = await api.post(
        "/api/clients",
        data
    );

    return response.data;
}