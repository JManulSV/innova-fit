import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import ClientSummaryTab from './ClientSummaryTab'
import ClientAssignedRoutinesTab from './ClientAssignedRoutinesTab'
import ClientNotesTab from './ClientNotesTab'

export default function ClientDetailTabs() {
  return (
    <Tabs className='py-12' defaultValue='summary'>
        <TabsList variant='line' className='w-full justify-start border-b border-border'>
            <TabsTrigger value='summary'>Resumen</TabsTrigger>
            <TabsTrigger value='routines'>Rutinas asignadas</TabsTrigger>
            <TabsTrigger value='notes'>Notas</TabsTrigger>
        </TabsList>

        <TabsContent value='summary'>
            <ClientSummaryTab />
        </TabsContent>
        <TabsContent value='routines'>
            <ClientAssignedRoutinesTab />
        </TabsContent>
        <TabsContent value='notes'>
            <ClientNotesTab />
        </TabsContent>
    </Tabs>
  )
}
