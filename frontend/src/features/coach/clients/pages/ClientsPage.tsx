import ClientPageFilterBar from "../components/ClientPageFilterBar";
import ClientPageHeader from "../components/ClientPageHeader"
import ClientPageTable from "../components/ClientPageTable";
import { useClients } from "../hooks/use-clients";
import { Container } from "@/components/layout/container";
import { Stack } from "@/components/layout/stack";

function ClientPage() {
  const { data, isPending } = useClients();
  const clients = data?.data || [];
  return (
    <Container>
      <Stack>
        <ClientPageHeader clientCount={clients.length} />
        <div className="space-y-6">
          <ClientPageFilterBar />
          <ClientPageTable clients={clients} />
        </div>
      </Stack>
    </Container>
  )
}

export default ClientPage;