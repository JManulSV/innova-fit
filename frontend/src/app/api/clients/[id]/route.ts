import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

type context = {
    params: Promise<{id: string}>
}

export async function GET( request: Request, context: context ) {
    const { id } = await context.params;
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;

        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }

        const response = await laravelApi.get(`/clients/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return Response.json(response.data);
    } catch (error) {
        //console.error(error);
        return Response.json({ message: "Error al obtener los clientes" }, { status: 500 });
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
        console.log(body);
        
        const response = await laravelApi.put(`/clients/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    
        return Response.json(response.data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Error al editar el cliente",
                details: error,
            },
            { status: 500 }
        );
    }
}


export async function DELETE(request: Request, context: context) {
    try {
        const { id } = await context.params;
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
        
        const response = await laravelApi.delete(`/clients/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    
        return Response.json(response.data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Error al eliminar el cliente",
                details: error,
            },
            { status: 500 }
        );
    }
}