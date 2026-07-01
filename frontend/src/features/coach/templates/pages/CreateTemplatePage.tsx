"use client"
import TemplateForm from "../components/TemplateForm";
import { useCreateTemplate } from "../hooks/use-create-template";

export default function CreateTemplatePage() {
    const { mutate: createTemplate, isPending } = useCreateTemplate();
    return <TemplateForm mode="create" onSubmit={createTemplate} isLoading={isPending} />;
}