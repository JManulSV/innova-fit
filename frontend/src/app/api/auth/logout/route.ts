import laravelApi from "@/lib/laravel-api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const cookieStore = await cookies();
    try {
        const token = cookieStore.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const response = await laravelApi.post(`/logout`,
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            cookieStore.delete('auth-token')

        return NextResponse.json({ success: true, message: 'Sesión cerrada correctamente' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 500 });
    }
}
