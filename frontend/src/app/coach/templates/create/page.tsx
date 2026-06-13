export default function CreateTemplatePage() {
  return (
    <div className="max-w-2xl">

      <h1 className="text-3xl font-bold mb-6">
        Crear Plantilla
      </h1>

      <form className="space-y-4">

        <div>
          <label className="block mb-2">
            Nombre
          </label>

          <input
            type="text"
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
          />
        </div>

        <div>
          <label className="block mb-2">
            Descripción
          </label>

          <textarea
            rows={5}
            className="
              w-full
              border
              rounded-lg
              px-4
              py-2
            "
          />
        </div>

        <button
          type="submit"
          className="
            px-4 py-2
            rounded-lg
            border
            hover:bg-gray-50
          "
        >
          Guardar Plantilla
        </button>

      </form>

    </div>
  );
}