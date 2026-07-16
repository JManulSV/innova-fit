import { ArrowUpRight } from 'lucide-react'

import { ComingSoonCard } from '../../../../../components/coming-soon-card'

const highlights = ['Progreso por cliente', 'Resumen visual', 'Seguimiento rápido']

const ClientSummaryTab = () => {
  return (
    <ComingSoonCard
      badgeLabel='En desarrollo'
      title='Próximamente'
      description='Esta sección mostrará un resumen claro del estado del cliente, con indicadores pensados para tomar decisiones más rápido.'
      highlights={highlights}
      previewLabel='Vista previa'
      previewTitle='Resumen del cliente'
      icon={<ArrowUpRight className='h-6 w-6' />}
    />
  )
}

export default ClientSummaryTab;
