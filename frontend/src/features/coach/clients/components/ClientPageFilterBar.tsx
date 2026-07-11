import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from "lucide-react"

function ClientPageFilterBar() {
  return (
    <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input type="text" placeholder="Buscar cliente..." className="pl-10" />
        </div>

        {/* Filter Options */}
        <Tabs defaultValue="all">
            <TabsList>
                <TabsTrigger value="all" className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Todos</TabsTrigger>
                <TabsTrigger value="active" className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Activos</TabsTrigger>
                <TabsTrigger value="inactive" className="cursor-pointer data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Inactivos</TabsTrigger>
            </TabsList>
        </Tabs>
    </div>
  )
}

export default ClientPageFilterBar