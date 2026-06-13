export default function TemplateDetailPage() {
  return (
    <div className="max-w-5xl mx-auto p-6">

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Push Day
        </h1>

        <p className="text-gray-500 mt-2">
          Rutina enfocada en pecho, hombros y tríceps
        </p>
      </div>

      <div className="bg-white border rounded-xl p-6">

        <h2 className="text-xl font-semibold mb-4">
          Ejercicios
        </h2>

        <div className="space-y-4">

          <div className="border rounded-lg p-4">
            Press banca
          </div>

          <div className="border rounded-lg p-4">
            Press militar
          </div>

          <div className="border rounded-lg p-4">
            Fondos
          </div>

        </div>

      </div>

      <div className="mt-6 flex gap-4">

        <button
          className="
            px-4 py-2
            rounded-lg
            border
          "
        >
          Editar
        </button>

        <button
          className="
            px-4 py-2
            rounded-lg
            border
            text-red-600
          "
        >
          Eliminar
        </button>

      </div>

    </div>
  );
}