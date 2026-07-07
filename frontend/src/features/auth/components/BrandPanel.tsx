export default function BrandPanel() {
  return (
    <aside className='relative hidden flex-col justify-between border-r bg-card p-16 lg:flex'>
        <span className='text-2xl font-semibold'>InnovaFit</span>

        <div className="flex flex-col gap-8">
            <h1 className='text-5xl  lg:text-6xl font-bold text-foreground font-heading max-w-md'>
                Entrenamiento con criterio, no con plantillas.
            </h1>
            <p className="text-muted-foreground text-lg max-w-md ">Cada rutina lleva el sello de tu coach:<br /> revisada, ajustada y pensada para vos. <br /> Iniciá sesión para ver tu progreso.</p>
        </div>

        <div className="font-mono text-sm uppercase">Coach → Cliente</div>
    </aside>
  )
};