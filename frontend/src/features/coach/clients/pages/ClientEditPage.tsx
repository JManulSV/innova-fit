import { useParams, useRouter } from "next/navigation";
import ClientForm from "../components/client-form/ClientForm";
import { useClient } from "../hooks/use-client";
import ClientFormSkeleton from "../components/client-form/components/ClientFormSkeleton";
import { Page } from "@/components/layout/page";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { H2, Mono, Muted } from "@/components/typography";

function ClientEditPage() {
  const { id } = useParams();
  const { data: client, isLoading, isError } = useClient(id as string);
  const router = useRouter();

  // Use optional chaining to avoid reading `name` when `client` is undefined
  const clientName = client?.name ?? "";
  
  const handleBack = () => {
    router.push('/coach/clients');
  };

  if (isLoading) return <ClientFormSkeleton />;

  if (isError || !client) {
    return <div className="p-6">No se pudo cargar el cliente.</div>;
  }

  return (
    <Page className="relative p-2 overflow-hidden">

      <div className="relative mx-auto flex w-full max-w-4xl flex-col gap-6 px-6 lg:px-8">
        <div className="max-w-2xl space-y-3">
          <Button onClick={handleBack} variant={'ghost'}  className="flex gap-2 text-sm cursor-pointer text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            <Mono>Volver a clientes</Mono>
          </Button>
          <H2>Editar cliente</H2>
          <Muted className="max-w-xl text-base">
            Edita la cuenta del cliente con su acceso inicial y sus datos principales.
          </Muted>
        </div>
        <ClientForm
          mode="edit"
          clientId={id as string}
          initialValues={{
            name: clientName,
            email: client.email || "",
            password: "",
            confirmPassword: "",
          }}
      />
      </div>
    </Page>
  );
}

export default ClientEditPage;