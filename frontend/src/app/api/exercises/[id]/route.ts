import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

type context = {
    params: Promise<{id: string}>
}

export async function GET(_request: Request, context: context) {
    try {
        const { id } = await context.params;
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;

        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
        
        const response = await laravelApi.get(`/exercises/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return Response.json(response.data);
        
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error al obtener el ejercicio' }, { status: 500 });
    }
    
}

export async function PUT(request: Request, context: context) {
    try {
        const { id } = await context.params;
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
        
        const body = await request.json();
        const response = await laravelApi.put(`/exercises/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return Response.json(response.data);
        
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error al actualizar el ejercicio' }, { status: 500 });
    }
    
}

export async function DELETE(_request: Request, context: context) {
    try {
        const { id } = await context.params;
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
        
        const response = await laravelApi.delete(`/exercises/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return Response.json(response.data);
        
    } catch (error) {
        console.error(error);
        return Response.json({ error: 'Error al eliminar el ejercicio' }, { status: 500 });
    }
    
}