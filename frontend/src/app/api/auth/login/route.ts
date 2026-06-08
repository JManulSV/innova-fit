import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        
        const res = await laravelApi.post(`/login`, body);

        const cookieStore = await cookies();
        cookieStore.set('auth-token', res.data.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        
        return NextResponse.json({
            success: true,
            data: {
                user: res.data.data.user,
            },
        });
    } catch (error) {
        console.error('Error en login:', error);
        return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
    }
}

export async function GET() {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;
    
    if (!token) {
        return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }
    
    return NextResponse.json({ authenticated: true });
}