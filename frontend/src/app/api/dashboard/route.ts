import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";


export async function GET(){
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'Unauthorized' },{ status: 401 });
        }

        const response = await laravelApi.get('/coach/dashboard', {
            headers: {
                'Authorization': `Bearer ${token}`,

            }
        });

        return Response.json(response.data);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}




