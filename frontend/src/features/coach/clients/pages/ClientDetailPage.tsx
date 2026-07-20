import { Page } from '@/components/layout/page'
import ClientDetailHeader from '../components/client-detail-page/ClientDetailHeader'
import { Container } from '@/components/layout/container'
import ClientDetailMetrics from '../components/client-detail-page/ClientDetailMetrics'
import ClientDetailTabs from '../components/client-detail-page/ClientDetailTabs'
import ClientDetailSkeleton from '../components/client-detail-page/ClientDetailSkeleton'
import ClientDetailError from '../components/client-detail-page/ClientDetailError'
import { useParams } from 'next/navigation'
import { useClient } from '../hooks/use-client'


function ClientDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data: client, isLoading, error, refetch } = useClient(id);
  console.log('Client data:', client);

  if (isLoading) {
    return <ClientDetailSkeleton />
  }

  if (error) {
    return <ClientDetailError message={error.message} onRetry={() => void refetch()} />
  }

  return (
    <Page className='p-1'>
        <Container>
                <ClientDetailHeader 
                  clientId={id}
                  clientName={client?.name || ''}
                  email={client?.email || ''}
                  statusLabel='Activo' 
                />
                <ClientDetailMetrics 
                  createAt={client?.created_at || ''}
                />
                <ClientDetailTabs />
        </Container>
    </Page>
  )
}

export default ClientDetailPage