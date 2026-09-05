import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;

        if (!token) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await laravelApi(`${process.env.NEXT_PUBLIC_API_URL}/body-parts`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
    
        return Response.json(response.data);
    } catch (error) {
        return Response.json({ error: "Failed to fetch body parts" }, { status: 500 });
    }
}