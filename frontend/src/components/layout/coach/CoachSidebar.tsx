"use client";

import Link from "next/link";

export default function CoachSidebar() {
  return (
    <aside className="w-64 border-r min-h-screen p-4">
      <h2 className="font-bold text-xl mb-6">
        Innova-Fit
      </h2>

      <nav className="flex flex-col gap-3">
        <Link href="/coach/dashboard">
          Dashboard
        </Link>

        <Link href="/coach/clients">
          Clientes
        </Link>

        <Link href="/coach/exercises">
          Ejercicios
        </Link>

        <Link href="/coach/templates">
          Plantillas
        </Link>
      </nav>
    </aside>
  );
}