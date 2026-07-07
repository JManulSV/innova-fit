import { H1, Mono, Muted } from "@/components/typography";

export default function BrandPanel() {
  return (
    <aside className='relative hidden flex-col justify-between border-r bg-card p-16 lg:flex'>
        <span className='text-2xl font-semibold'>InnovaFit</span>

        <div className="flex flex-col gap-8 max-w-md">
            <H1 className="text-6xl">Entrenamiento con criterio, no con plantillas.</H1>
            <Muted className="text-lg">Cada rutina lleva el sello de tu coach:<br /> revisada, ajustada y pensada para vos. <br /> Iniciá sesión para ver tu progreso.</Muted>
        </div>

        <Mono>Coach → Cliente</Mono>
    </aside>
  )
};