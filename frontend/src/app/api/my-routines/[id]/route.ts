import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

type context = {
    params: Promise<{id: string}>
}

export async function GET(request: Request, context: context){
    try {
        const { id } = await context.params;
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
    
        const response = await laravelApi.get(`/assigned-workout/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return Response.json(response.data);
    } catch (error) {
        console.error(error);
        return Response.json({ message: "Error al obtener la rutina" }, { status: 500 });
    }
    
}