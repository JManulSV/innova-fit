import { Page } from '@/components/design-system/page'
import ClientDetailHeader from '../components/client-detail-page/ClientDetailHeader'
import { Container } from '@/components/design-system/container'
import ClientDetailMetrics from '../components/client-detail-page/ClientDetailMetrics'
import ClientDetailTabs from '../components/client-detail-page/ClientDetailTabs'
import ClientDetailSkeleton from '../components/client-detail-page/ClientDetailSkeleton'
import ClientDetailError from '../components/client-detail-page/ClientDetailError'
import { useParams } from 'next/navigation'
import { useClient } from '../hooks/use-client'


function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: client, isLoading, error, refetch } = useClient(id);

  if (isLoading) {
    return <ClientDetailSkeleton />
  }

  if (error || !client) {
    return <ClientDetailError message={error?.message ?? 'No se pudo cargar el cliente.'} onRetry={() => void refetch()} />
  }

  return (
    <Page className='p-1'>
        <Container>
                <ClientDetailHeader 
                  clientId={id}
                  clientName={client.name || ''}
                  email={client.email || ''}
                  statusLabel='Activo' 
                />
                <ClientDetailMetrics 
                  createAt={client.created_at || ''}
                />
                <ClientDetailTabs />
        </Container>
    </Page>
  )
}

export default ClientDetailPage
