import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;
        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const response = await axios.post(`${process.env.API_URL}/logout`,
            {}, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

        return NextResponse.json({ success: true, message: 'Sesión cerrada correctamente' });
    } catch (error) {
        return NextResponse.json({ error: 'Error al cerrar sesión' }, { status: 500 });
    }finally{
        cookieStore.delete('auth-token');
    }
}
