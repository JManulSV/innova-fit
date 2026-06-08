"use client";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLogin } from "../hooks/use-login";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setUser = useAuthStore((state) => state.setUser);
    const router = useRouter();

    const loginMutation = useLogin();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const response = await loginMutation.mutateAsync({ email, password });
        const userData = response.data.user;
        setUser(userData);

        if (userData) {
            if (userData.role === 'coach') {
                router.push('/coach/dashboard');
            } else {
                router.push('/client/dashboard');
            }
        }
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" disabled={loginMutation.isPending}>{loginMutation.isPending ? 'Loading...' : 'Login'}</button>
            </form>
        </div>
    );
}