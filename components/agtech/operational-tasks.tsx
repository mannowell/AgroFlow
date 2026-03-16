"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface Task {
    id: string;
    title: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    status: 'pending' | 'completed';
}

const mockTasks: Task[] = [
    { id: '1', title: 'Vacinação Febre Aftosa', dueDate: 'Hoje', priority: 'high', status: 'pending' },
    { id: '2', title: 'Limpeza dos Comedouros - Setor Norte', dueDate: 'Amanhã', priority: 'medium', status: 'pending' },
    { id: '3', title: 'Pesagem Amostral (10%)', dueDate: 'Em 2 dias', priority: 'low', status: 'pending' },
    { id: '4', title: 'Ajuste de Dieta (Aumento Milho)', dueDate: 'Concluído', priority: 'medium', status: 'completed' },
];

export function OperationalTasks() {
    return (
        <Card className="border-none shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                    Gestão Operacional
                </CardTitle>
                <Badge variant="secondary" className="font-normal">4 Tarefas</Badge>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {mockTasks.map((task) => (
                        <div 
                            key={task.id} 
                            className={`flex items-center justify-between p-3 rounded-xl border transition-all hover:bg-muted/50 ${task.status === 'completed' ? 'opacity-60 bg-muted/30' : 'bg-background shadow-sm'}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-full ${task.status === 'completed' ? 'bg-emerald-100 text-emerald-600' : 'bg-primary/10 text-primary'}`}>
                                    {task.status === 'completed' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                                </div>
                                <div>
                                    <p className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}>
                                        {task.title}
                                    </p>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">
                                        Prazo: {task.dueDate}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                {task.priority === 'high' && !task.status && (
                                    <AlertCircle className="h-4 w-4 text-destructive" />
                                )}
                                <Badge 
                                    variant={task.priority === 'high' ? 'destructive' : task.priority === 'medium' ? 'default' : 'secondary'}
                                    className="text-[10px] px-2 py-0"
                                >
                                    {task.priority}
                                </Badge>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
