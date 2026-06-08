import axios from "axios";
import { MeResponse } from "../types/auth.types";

export async function getMe() {
    const response = await axios.get<MeResponse>('/api/auth/me');
    return response.data;
}