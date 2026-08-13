"use client";
import { useRouter } from "next/navigation";
import { useLogin } from "../hooks/use-login";
import { User } from "../types/auth.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { H2, Mono, Muted } from "@/components/typography";
import { useForm } from "react-hook-form";
import { LoginFormData, loginSchema } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import InputField from "@/components/form/input-field";

export default function LoginForm() {

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    });

    const router = useRouter();

    const { mutateAsync: loginMutation, isPending, error:loginError } = useLogin();

    const onSubmit = async (data: LoginFormData) => {
        const response = await loginMutation(data);
        const userData: User = response.data.user;

        const routes = {
            coach: "/coach/dashboard",
            client: "/client/dashboard",
        };

        router.replace(routes[userData.role]);
    };

    return (
        <section className="flex min-h-full items-center justify-center px-4 py-6 lg:px-20 lg:py-20">
           <div className="w-full max-w-md space-y-6 rounded-2xl border bg-card p-6 shadow-sm lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none">

                <div>
                    <H2>Bienvenido de nuevo</H2>
                    <Muted className="mt-2 text-base">Ingresá tus datos para ver tu rutina y tu progreso.</Muted>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <InputField
                        name="email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        error={errors.email}
                        isDisabled={isPending}
                        register={register}
                    />

                    <InputField
                        name="password"
                        label="Contraseña"
                        type="password"
                        placeholder="Password"
                        error={errors.password}
                        isDisabled={isPending}
                        register={register}
                    />

                    <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                            <Input type="checkbox" disabled/>
                            <Muted>Recordarme</Muted> 
                        </label>
                        <Button variant={"link"} className="text-primary text-sm cursor-pointer">
                            ¿Olvidaste tu contraseña?
                        </Button>
                    </div>

                    <Button className="w-full h-10 cursor-pointer" type="submit" disabled={isPending}>{isPending ? 'Cargando...' : 'Login'}</Button>
                </form>
                {loginError && (
                    <Muted className="text-xs text-destructive">
                        Email o contraseña incorrecta
                    </Muted>
                )}
            </div> 
        </section> 
    );
}
