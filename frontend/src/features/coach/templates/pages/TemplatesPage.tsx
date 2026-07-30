"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Page } from "@/components/layout/page";
import { Container } from "@/components/layout/container";
import { Text, Muted } from "@/components/typography";

import { useDeleteTemplate } from "@/features/coach/templates/hooks/use-delete-template";
import { useTemplates } from "@/features/coach/templates/hooks/use-templates";

import {
  TemplatesSkeleton,
  SearchSortBar,
  TemplatesHeader,
  EmptyTemplates,
  TemplatesGrid,
} from "@/features/coach/templates/components";

type SortMode = "recent" | "oldest" | "name";

const sortOptions: Array<{ value: SortMode; label: string }> = [
  { value: "recent", label: "Más recientes" },
  { value: "oldest", label: "Más antiguas" },
  { value: "name", label: "Nombre A-Z" },
];

export default function TemplatesPage() {
  const router = useRouter();
  const { data, isLoading, error } = useTemplates();
  const { mutateAsync: deleteTemplate, isPending: isDeleting } = useDeleteTemplate();
  const [search, setSearch] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("recent");
  console.log("data", data);

  const templates = useMemo(() => data ?? [], [data]);

  const filteredTemplates = useMemo(() => {
    const query = search.trim().toLowerCase();

    return [...templates]
      .filter((template) => {
        if (!query) return true;
        const haystack = `${template.name} ${template.description}`.toLowerCase();
        return haystack.includes(query);
      })
      .sort((a, b) => {
        if (sortMode === "name") return a.name.localeCompare(b.name, "es");

        const left = new Date(a.created_at).getTime();
        const right = new Date(b.created_at).getTime();

        return sortMode === "recent" ? right - left : left - right;
      });
  }, [search, sortMode, templates]);

  const handleDelete = async (id: number) => {
    if (isDeleting) return;

    await deleteTemplate(id.toString());
  };

  return (
    <Page className="bg-background">
      <Container className="flex w-full flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <TemplatesHeader />

        <SearchSortBar search={search} onSearchChange={setSearch} sortMode={sortMode} onSortChange={setSortMode} sortOptions={sortOptions} />

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Text className="text-sm text-slate-400">
            <span className="font-medium text-white">{filteredTemplates.length}</span>{" "}
            <Muted className="ml-1">plantillas</Muted>
          </Text>

          <Muted className="text-sm">{isDeleting ? "Procesando cambios..." : ""}</Muted>
        </div>

        {error ? (
          <Card className="border-red-500/20 bg-red-500/5 text-red-100">
            <CardHeader>
              <CardTitle className="text-base text-red-50">No se pudo cargar el listado</CardTitle>
              <CardDescription className="text-red-100/80">{error.message}</CardDescription>
            </CardHeader>
          </Card>
        ) : isLoading ? (
          <TemplatesSkeleton />
        ) : filteredTemplates.length === 0 ? (
          <EmptyTemplates />
        ) : (
          <TemplatesGrid templates={filteredTemplates} onDelete={handleDelete} />
        )}
      </Container>
    </Page>
  );
}
