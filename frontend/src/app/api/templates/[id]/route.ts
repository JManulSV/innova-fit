import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

type context = {
    params: Promise<{id: string}>
}

export async function GET(_request: Request, context: context) {
    try {
        const params = await context.params;
        const { id } = params;
    
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
    
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
    
        const response =  await laravelApi.get(`/workout-day-templates/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        return Response.json(response.data);
    } catch (error) {
        console.error(error);
        return Response.json({ error: error instanceof Error ? error.message : 'Error al obtener la plantilla' }, { status: 500 });
    }
}

export async function PUT(request: Request, context: context) {
    try {
        const params = await context.params;
        const { id } = params;
    
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
    
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
        
        const body = await request.json();
    
        const response =  await laravelApi.put(`/workout-day-templates/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        return Response.json(response.data);
    } catch (error) {
        return Response.json({ error: error instanceof Error ? error.message : 'Error al actualizar la plantilla' }, { status: 500 });
    }
}

export async function DELETE(_request: Request, context: context) {
    try {
        const params = await context.params;
        const { id } = params;
    
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
    
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
    
        const response =  await laravelApi.delete(`/workout-day-templates/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
    
        return Response.json(response.data);
    } catch (error) {
        return Response.json({ error: error instanceof Error ? error.message : 'Error al eliminar la plantilla' }, { status: 500 });
    }
}