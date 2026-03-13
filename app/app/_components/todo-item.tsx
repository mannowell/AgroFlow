"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { toggleTodo, deleteTodo } from "../actions";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    done: boolean;
  };
}

export function TodoItem({ todo }: TodoItemProps) {
  const handleToggle = async (checked: boolean) => {
    try {
      await toggleTodo(todo.id, checked);
      toast.success(checked ? "Tarefa concluída!" : "Tarefa reaberta.");
    } catch (error) {
      toast.error("Erro ao atualizar tarefa.");
    }
  };

  const handleDelete = async () => {
    try {
      if (confirm("Deseja realmente excluir esta tarefa?")) {
        await deleteTodo(todo.id);
        toast.success("Tarefa excluída.");
      }
    } catch (error) {
      toast.error("Erro ao excluir tarefa.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center justify-between p-4 bg-card rounded-xl border shadow-sm group hover:border-primary/50 transition-colors"
    >
      <div className="flex items-center gap-3">
        <Checkbox 
          id={todo.id} 
          checked={todo.done} 
          onCheckedChange={handleToggle}
          className="h-5 w-5"
        />
        <label 
          htmlFor={todo.id}
          className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-all ${todo.done ? 'line-through text-muted-foreground' : ''}`}
        >
          {todo.title}
        </label>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDelete}
        className="opacity-0 group-hover:opacity-100 text-destructive hover:bg-destructive/10 transition-opacity"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}
