"use client";
import { useParams } from "next/navigation";
import TemplateForm from "../components/TemplateForm";
import { useTemplate } from "../hooks/use-template";
import { useUpdateTemplate } from "../hooks/use-update-template";

export default function EditTemplatePage() {
    const { id } = useParams();
    const { data, isPending } = useTemplate(id as string);
    const { mutateAsync } = useUpdateTemplate();

    return <TemplateForm mode="edit" onSubmit={(data) => mutateAsync({ id: id as string, request: data })} isLoading={isPending} initialData={data?.data} />;
}