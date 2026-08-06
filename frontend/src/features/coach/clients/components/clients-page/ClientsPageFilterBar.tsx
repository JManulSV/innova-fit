import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

function ClientsPageFilterBar() {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="text" placeholder="Buscar cliente..." className="pl-10" />
        </div>

        <Tabs defaultValue="all" className="w-full lg:w-auto">
            <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
                <TabsTrigger value="all" className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Todos</TabsTrigger>
                <TabsTrigger value="active" className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activos</TabsTrigger>
                <TabsTrigger value="inactive" className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Inactivos</TabsTrigger>
            </TabsList>
        </Tabs>
    </div>
  )
}

export default ClientsPageFilterBar
