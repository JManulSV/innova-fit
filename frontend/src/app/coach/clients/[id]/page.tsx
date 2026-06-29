"use client";
import { useParams, useRouter } from "next/navigation";
import { useClient } from "@/features/clients/hooks/use-client";
import { useDeleteClient } from "@/features/clients/hooks/use-delete-client";

export default function ClientDetailPage() {
  const { id } = useParams();
  const { data, isLoading, error } = useClient(id as string);
  const { mutate: deleteClient, isPending } = useDeleteClient(id as string);
  const client = data?.data;
  const router = useRouter();

  const handleEditClient = () => {
    router.push(`/coach/clients/${id}/edit`);
  };

  const handleDeleteClient = () => {
    
    if (confirm("¿Estás seguro de que deseas eliminar este cliente?")) {
      deleteClient();
      router.push(`/coach/clients`);
    }else{
      return;
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-red-800">
            Error al cargar el cliente
          </h2>
          <p className="text-red-600 mt-2">
            No se pudo cargar la información del cliente.
          </p>
        </div>
      </div>
    );
  }

    if (!client) {
      return (
          <div>
              Cliente no encontrado
          </div>
      );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Cliente
        </h1>

        <p className="text-gray-500 mt-2">
          Información general del cliente
        </p>
      </div>

      {/* Card principal */}
      <div className="bg-white border rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center text-xl font-bold">
            {client?.name?.charAt(0).toUpperCase() || '?'}
          </div>

          <div>
            <h2 className="text-2xl font-semibold">
              {client?.name}
            </h2>

            <p className="text-gray-500">
              Cliente activo
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Nombre
            </label>

            <p className="font-medium">
              {client?.name}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Email
            </label>

            <p className="font-medium">
              {client?.email}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">
              Fecha de registro
            </label>

            <p className="font-medium">
              {new Date(client?.created_at).toLocaleDateString()}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-500 block mb-1">
              ID Cliente
            </label>

            <p className="font-medium">
              #{client?.id}
            </p>
          </div>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex gap-4">
        <button
        className="
            cursor-pointer
            px-4 py-2
            rounded-lg
            border
            text-blue-500
            hover:bg-gray-50
          "
          onClick={() => router.push(`/coach/clients/${client?.id}/assign-routine`)}
        >
          Asignar Rutina
        </button>

        <button
          className="
            cursor-pointer
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-50
          "
          onClick={handleEditClient}
        >
          Editar Cliente
        </button>

        <button
          className="
            cursor-pointer
            px-4 py-2
            rounded-lg
            border
            text-red-600
            hover:bg-red-50
          "
          onClick={() => handleDeleteClient()}
          disabled={isPending}
        >
          {isPending ? "Eliminando..." : "Eliminar"}
        </button>
      </div>

      {/* Futuras secciones */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">
          Próximamente
        </h2>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="border rounded-lg p-4">
            Rutinas Asignadas
          </div>

          <div className="border rounded-lg p-4">
            Progreso
          </div>

          <div className="border rounded-lg p-4">
            Historial
          </div>
        </div>
      </div>
    </div>
  );
}