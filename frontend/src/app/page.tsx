"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="h-screen w-screen">
      Innova-fit home
      <Button onClick={() => router.push("/login")}>
        Entrar
      </Button>
    </div>
  );
}
