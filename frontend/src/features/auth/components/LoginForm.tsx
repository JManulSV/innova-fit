"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";
import { User } from "../types/auth.types";

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
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" disabled={isPending} value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" disabled={isPending} value={password} onChange={(e) => setPassword(e.target.value)} />
                {error && <p>Correo o contraseña incorrectos</p>}
                <button type="submit" disabled={isPending}>{isPending ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    );
}