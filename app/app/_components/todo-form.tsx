"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { createTodo } from "../actions";
import { useRef } from "react";
import { toast } from "sonner";

export function TodoForm() {
    const formRef = useRef<HTMLFormElement>(null);

    async function action(formData: FormData) {
        const title = formData.get("title") as string;
        if (!title || title.trim() === "") return;

        try {
            await createTodo(formData);
            formRef.current?.reset();
            toast.success("Tarefa adicionada!");
        } catch (error) {
            toast.error("Erro ao adicionar tarefa.");
        }
    }

    return (
        <form ref={formRef} action={action} className="flex gap-2 w-full">
            <Input 
                name="title" 
                placeholder="Adicionar nova tarefa..." 
                className="flex-1 h-12 bg-card border-muted-foreground/20 focus-visible:ring-primary"
                required
            />
            <Button type="submit" size="icon" className="h-12 w-12 shrink-0">
                <Plus className="h-5 w-5" />
            </Button>
        </form>
    );
}
