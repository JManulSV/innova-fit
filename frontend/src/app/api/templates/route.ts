import { TemplateResponse } from "@/features/templates/types/templates.type";
import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookiesStore = await cookies()
        const token = cookiesStore.get('auth-token')?.value
    
        if (!token) {
            return Response.json({message: 'Unauthorized'}, {status: 401})
        }
    
        const response = await laravelApi.get<TemplateResponse>('/workout-day-templates', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    
        return Response.json(response.data.data.data);
    } catch (error) {
        console.error('Error fetching templates:', error);
        return Response.json({message: 'Internal server error'}, {status: 500});
    }
}