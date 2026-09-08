import { ExerciseResponse } from '@/features/coach/exercises/types/exercise.types';
import laravelApi from '@/lib/laravel-api';
import { cookies } from 'next/headers'

export async function GET(request: Request){
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
    
        const response = await laravelApi.get<ExerciseResponse>('/exercises', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
            params: Object.fromEntries(searchParams.entries())
        });

        return Response.json(response.data);
    } catch (error) {
        console.error('Error fetching exercises:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request){
    try {
        const cookiesStore = await cookies();
        const token = cookiesStore.get('auth-token')?.value;
        
        if (!token) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }
    
        const body = await request.json();
        const response = await laravelApi.post('/exercises', body, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return Response.json(response.data);
    } catch (error) {
        console.error('Error creating exercise:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
