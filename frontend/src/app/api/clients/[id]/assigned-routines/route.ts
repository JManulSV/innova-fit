import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

// type context = {
//     params: Promise<{id: string}>
// }

export async function POST(_request: Request,) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        const body = await _request.json();

        const response = await laravelApi.post(`/assign-workout`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });    
        return Response.json(response.data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error al asignar el ejercicio a las rutinas' }, { status: 500 });
    }
    
    
}