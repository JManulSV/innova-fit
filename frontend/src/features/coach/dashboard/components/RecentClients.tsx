import { Muted, Text } from "@/components/typography";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

const clients = [
  {
    name: "Mariana Torres",
    initials: "MT",
    date: "2 jul",
  },
  {
    name: "Diego Fernández",
    initials: "DF",
    date: "1 jul",
  },
  {
    name: "Valeria Ruiz",
    initials: "VR",
    date: "29 jun",
  },
  {
    name: "Santiago Gómez",
    initials: "SG",
    date: "27 jun",
  },
  {
    name: "Camila López",
    initials: "CL",
    date: "25 jun",
  },
];


function RecentClients() {
  return (
    <Card className="overflow-hidden p-0 gap-0">
      {clients.map((client) => (
        <div
          key={client.name}
          className="flex items-center justify-between border-b border-border px-5 py-3 last:border-b-0 hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              {client.initials}
            </div>

            <div>
              <Text className="font-medium text-sm leading-none">
                {client.name}
              </Text>

              <Muted className="mt-1 text-xs">
                {client.date}
              </Muted>
            </div>
          </div>

          <ChevronRight className="size-4 text-muted-foreground" />
        </div>
      ))}
    </Card>
  );
}

export default RecentClients;