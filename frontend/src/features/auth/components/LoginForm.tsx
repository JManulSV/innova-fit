"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import { User } from "../types/auth.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { H2, Mono, Muted, Text } from "@/components/typography";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const { mutateAsync: loginMutation, isPending, error } = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await loginMutation({ email, password });
        const userData: User = response.data.user;
        
        const routes = {
            coach: "/coach/dashboard",
            client: "/client/dashboard",
        };

        router.replace(routes[userData.role]);

    };

    return (
        <section className="flex items-center justify-center p-8 lg:p-20">
           <div className="w-full max-w-md space-y-6">

                <div>
                    <H2>Bienvenido de nuevo</H2>
                    <Muted className="mt-2 text-md">Ingresá tus datos para ver tu rutina y tu progreso.</Muted>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col gap-3">
                        <label className="font-mono" htmlFor="email"><Mono>Correo</Mono></label>
                        <Input type="email" id="email" placeholder="Email" disabled={isPending} value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label className="font-mono" htmlFor="password"><Mono>Contraseña</Mono></label>
                        <Input type="password" id="password" placeholder="Password" disabled={isPending} value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    {error && <p>Correo o contraseña incorrectos</p>}

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <Input type="checkbox" disabled/>
                            <Text>Recordarme</Text> 
                        </label>
                        <Button variant={"link"} className="text-primary text-sm cursor-pointer">
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </div>

                    <Button className="w-full h-10 cursor-pointer" variant={"default"} type="submit" disabled={isPending}>{isPending ? 'Loading...' : 'Login'}</Button>
                </form>
            </div> 
        </section> 
    );
}