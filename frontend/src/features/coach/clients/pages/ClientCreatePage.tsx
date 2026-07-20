import { Page } from '@/components/layout/page';
import { H2, Muted, Mono } from '@/components/typography';
import ClientForm from '../components/client-form/ClientForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function ClientCreatePage() {
  const router = useRouter();

  const handleBack = () => {
    router.push('/coach/clients');
  };
  return (
    <Page className="relative p-2 overflow-hidden">

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <Button onClick={handleBack} variant={'ghost'}  className="flex gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Mono>Volver a clientes</Mono>
          </Button>
          <H2>Agregar cliente</H2>
          <Muted className="max-w-xl text-base">
            Crea la cuenta del cliente con su acceso inicial y sus datos principales.
          </Muted>
        </div>
        <ClientForm mode="create" />  
      </div>
    </Page>
  )
}

export default ClientCreatePage;