"use client";

import LogoutButton from "@/components/LogoutButton";
import { Container } from "@/components/design-system/container";
import { PageDescription, PageTitle } from "@/components/design-system/page";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth-store";

export default function ClientProfilePage() {
  const user = useAuthStore((state) => state.user);

  const initials = user?.name
    ?.split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Container className="py-4">
      <div className="flex items-center gap-3 pb-6">
        <Avatar className="size-12">
          <AvatarFallback className="bg-primary/10 text-primary">
            {initials ?? "C"}
          </AvatarFallback>
        </Avatar>

        <div>
          <PageTitle className="text-2xl">Perfil</PageTitle>
          <PageDescription>{user?.email}</PageDescription>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Tu cuenta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Nombre</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <LogoutButton />
        </CardContent>
      </Card>
    </Container>
  );
}
