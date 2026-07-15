import ClientsPageFilterBar from "../components/clients-page/ClientsPageFilterBar";
import ClientsPageHeader from "../components/clients-page/ClientsPageHeader"
import ClientsPageSkeleton from "../components/clients-page/ClientsPageSkeleton";
import ClientsPageTable from "../components/clients-page/ClientsPageTable";
import { useClients } from "../hooks/use-clients";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";

function ClientsPage() {
  const { data, isPending } = useClients();
  const clients = data?.data || [];
  return (
    <Container>
      <Stack>
        {isPending ? (
          <ClientsPageSkeleton />
        ) : (
          <>
            <ClientsPageHeader clientCount={clients.length} />
            <div className="space-y-6">
              <ClientsPageFilterBar />
              <ClientsPageTable clients={clients} />
            </div>
          </>
        )}
      </Stack>
    </Container>
  )
}

export default ClientsPage;