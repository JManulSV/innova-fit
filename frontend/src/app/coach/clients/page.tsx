"use client";

import { useClients } from "@/features/coach/clients/hooks/use-clients";
import { Client } from "@/features/coach/clients/types/clients.types";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ClientsPage() {
  const { data, isLoading, error } = useClients();
  const clients = data?.data || [];
  const router = useRouter();

  const handleCreateClient = () => {
    router.push("/coach/clients/create");
  };

  if (isLoading) {
    return <div>Cargando clientes...</div>;
  }

  if (error) {
    return <div>Error al cargar clientes</div>;
  }

  if (clients.length === 0) {
    return <div>No hay clientes</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-baseline">
        <h1 className="text-2xl font-bold mb-6">
          Clientes
        </h1>
        <button className="px-4 py-2 rounded-lg border" onClick={handleCreateClient}>
          Crear Cliente
        </button>
      </div>

      <div className="space-y-4">
        {clients.map((client: Client) => (
          <Link
            key={client.id}
            href={`/coach/clients/${client.id}`}
            className="border rounded-lg p-4 block"
          >
            <h2>{client.name}</h2>
            <p>{client.email}</p>
            <p className="text-sm text-gray-600">{new Date(client.created_at).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}