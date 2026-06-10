"use client";
import { useCreateClient } from "@/features/clients/hooks/use-create-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateClientPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { mutateAsync, isPending, error } =
    useCreateClient();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log("Submitting client data:", { name, email, password });

    await mutateAsync({
      name,
      email,
      password,
    });

    router.push("/coach/clients");
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-6">
        Crear Cliente
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
            ? "Creando..."
            : "Crear Cliente"}
        </button>
      </form>
    </div>
  );
}
