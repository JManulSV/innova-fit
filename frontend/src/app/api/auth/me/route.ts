import laravelApi from "@/lib/laravel-api";
import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth-token')?.value;

        if (!token) {
            return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
        }

        const res = await laravelApi.get(`/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return NextResponse.json({
            success: true,
            data: {
                user: res.data.data,
            },
        });
    } catch (error) {
        console.error('Error en me:', error);
        return NextResponse.json({ error: 'Error al obtener el usuario' }, { status: 500 });
    }
}