import { useAuthStore } from "@/stores/auth-store";

export default function ClientHeader() {

  const user = useAuthStore(state => state.user);

  return (
    <header className="bg-white border-b px-4 py-4">

      <h1 className="text-xl font-bold">
        Hola, {user?.name} 👋
      </h1>

      <p className="text-sm text-gray-500">
        Bienvenido de nuevo
      </p>

    </header>
  );
}