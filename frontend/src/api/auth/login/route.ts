import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password } = body;
        
        const res = await axios.post(`${process.env.API_URL}/login`, { email, password });

        if(res.status !== 200) {
            return NextResponse.json({ error: 'No autorizado' }, { status: res.status });
        }

        const cookieStore = await cookies();
        cookieStore.set('auth-token', res.data.data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });
        
        return NextResponse.json({ success: true, user: res.data.data.user });
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