import laravelApi from "@/lib/laravel-api";
import { ClientsResponse } from "@/features/coach/clients/types/clients.types";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        
        const response = await laravelApi.get<ClientsResponse>('/clients', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: Object.fromEntries(searchParams.entries()),
        });
    
        return Response.json(response.data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Error al crear el cliente",
                details: error,
            },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'No autorizado' }, { status: 401 });
        }
        
        const body = await request.json();
        console.log(body);
        
        const response = await laravelApi.post('/clients', body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    
        return Response.json(response.data);
    } catch (error) {
        console.error(error);

        return Response.json(
            {
                error: "Error al crear el cliente",
                details: error,
            },
            { status: 500 }
        );
    }
}