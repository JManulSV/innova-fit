"use client"
import { useRouter } from "next/navigation";
import { useState, useEffect, useMemo } from "react";
import { useEditClient } from "@/features/coach/clients/hooks/use-edit-client";
import { useParams } from "next/navigation";
import { useClient } from "@/features/coach/clients/hooks/use-client";

export default function EditClientPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { id } = useParams();
    
    const router = useRouter();
  
    const { mutateAsync, isPending, error } =
      useEditClient();

    const { data, isLoading } = useClient(id as string);
    const client = data?.data;

    const handleSubmit = async(
      e: React.FormEvent<HTMLFormElement>
    ) => {
      e.preventDefault();
      console.log("Submitting client data:", { name, email, password });
  
      await mutateAsync( { id: id as string, data: { name, email, password } });
  
      router.push(`/coach/clients/${id}`);
    };

    useEffect(() => {
      if (!client) {
        return;
      }
      setName(client.name);
      setEmail(client.email);
    }, [client, data]);

    if (isLoading) {
      return <div>Cargando...</div>;
    }
  
    return (
      <div className="max-w-xl">
        <h1 className="text-3xl font-bold mb-6">
          Editar Cliente
        </h1>
  
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2">
              Nombre
            </label>
  
            <input
              type="text"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
  
          <div>
            <label className="block mb-2">
              Email
            </label>
  
            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
  
          <div>
            <label className="block mb-2">
              Contraseña
            </label>
  
            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
  
          {error && (
            <div className="text-red-500">
              {error.message}
            </div>
          )}
  
          <button
            type="submit"
            disabled={isPending}
            className="px-4 py-2 rounded-lg border"
          >
            {isPending
              ? "Editando..."
              : "Editar Cliente"}
          </button>
        </form>
      </div>
    );
}

