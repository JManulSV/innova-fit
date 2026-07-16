import { ComingSoonCard } from '@/components/coming-soon-card'
import { ArrowUpRight } from 'lucide-react'
import React from 'react'

export default function ClientNotesTab() {
    const highlights = ['Tomar notas', 'Gestionar notas', 'Notas rápidas']
  return (
    <ComingSoonCard 
        title='Próximamente'
        description='Esta sección permitirá tomar y gestionar notas sobre el cliente.'
        badgeLabel='En desarrollo'
        icon={<ArrowUpRight className='h-6 w-6' />}
        highlights={highlights}
        previewLabel='Vista previa'
        previewTitle='Notas del cliente'
    />
  )
}
