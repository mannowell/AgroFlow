"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';
import { 
    Activity, ArrowUpRight, AlertTriangle, Calendar, 
    ChevronRight, Info, Package, TrendingUp, Users 
} from "lucide-react";
import { calculateMetrics, getIdealWeightForDay, ZootecnicMetrics } from "@/lib/zootecnia";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { OperationalTasks } from "./operational-tasks";

interface AgtechDashboardProps {
    batch: any; // Using any for MVP speed, should be typed in production
}

export function AgtechDashboard({ batch }: AgtechDashboardProps) {
    const metrics = calculateMetrics(
        batch.initialQuantity,
        batch.initialAvgWeight,
        new Date(batch.startDate),
        batch.logs
    );

    const isAlertActive = metrics.ca > 2.5;

    // Prepare chart data
    const chartData = batch.logs.map((log: any) => {
        const days = log.weekNumber * 7;
        return {
            name: `Sem ${log.weekNumber}`,
            Peso: log.currentAvgWeight,
            Ideal: getIdealWeightForDay(days).toFixed(2),
        };
    });

    return (
        <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
            {/* Header Info */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary" />
                        Lote: {batch.name}
                    </h2>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Iniciado em {format(new Date(batch.startDate), "dd 'de' MMMM", { locale: ptBR })}
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20 px-3 py-1">
                        {metrics.daysPassed} Dias de Engorda
                    </Badge>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-md bg-gradient-to-br from-card to-muted/20">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <Activity className="h-5 w-5 text-blue-500" />
                            <Badge variant="secondary" className="text-xs text-blue-500 bg-blue-500/10 hover:bg-blue-500/20">Ao Vivo</Badge>
                        </div>
                        <div className="text-2xl font-bold">{metrics.ca.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Conversão Alimentar (CA)</p>
                    </CardContent>
                </Card>

                <Card className={isAlertActive ? "border-destructive bg-destructive/5 text-destructive animate-pulse" : "border-none shadow-md"}>
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <AlertTriangle className={isAlertActive ? "animate-bounce h-5 w-5" : "h-5 w-5 text-muted-foreground"} />
                            {isAlertActive && <Badge variant="destructive">ALERTA ATIVO</Badge>}
                        </div>
                        <div className="text-2xl font-bold">{metrics.ca > 2.5 ? "Crítico" : "Normal"}</div>
                        <p className="text-xs uppercase font-semibold tracking-wider opacity-70">Status de Eficiência</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <Users className="h-5 w-5 text-purple-500" />
                            <Badge variant="secondary" className="text-[10px] bg-purple-100 text-purple-700">{metrics.mortality.toFixed(2)}% Mort.</Badge>
                        </div>
                        <div className="text-2xl font-bold">{(metrics.gpd * 1000).toFixed(0)}g</div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Ganho de Peso Diário (GPD)</p>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-md bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-l-4 border-emerald-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <TrendingUp className="h-5 w-5 text-emerald-600" />
                            <Badge variant="outline" className="text-[10px] border-emerald-200 text-emerald-700 bg-emerald-50">Projeção</Badge>
                        </div>
                        <div className="text-2xl font-bold text-emerald-700">
                            {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(metrics.projectedProfit)}
                        </div>
                        <p className="text-xs text-muted-foreground uppercase font-semibold tracking-wider">Lucro Estimado / Lote</p>
                    </CardContent>
                </Card>
            </div>

            {/* Chart and Prediction */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 border-none shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold flex items-center gap-2">
                            <TrendingUp className="h-5 w-5 text-primary" />
                            Curva de Crescimento vs. Ideal
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#888', fontSize: 12}} unit="kg" />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Legend verticalAlign="top" align="right" />
                                <Line type="monotone" dataKey="Peso" stroke="#10b981" strokeWidth={3} dot={{ r: 4, fill: '#10b981' }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="Ideal" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="border-none shadow-lg bg-primary text-primary-foreground relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                        <Calendar className="h-24 w-24" />
                    </div>
                    <CardHeader>
                        <CardTitle className="text-lg font-medium opacity-90 italic">Previsão Inteligente</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <p className="text-sm font-light uppercase tracking-widest opacity-70 mb-1">Data Estimada de Abate</p>
                            <div className="text-4xl font-extrabold pb-2 border-b border-primary-foreground/20">
                                {format(metrics.estimatedAbateDate, "dd/MM/yyyy")}
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="bg-white/20 p-2 rounded-lg">
                                        <Info className="h-4 w-4" />
                                    </div>
                                    <p className="text-xs font-medium uppercase tracking-wider">Insight do Lote</p>
                                </div>
                                <p className="text-sm leading-relaxed opacity-90">
                                    {metrics.ca > 2.5 
                                        ? "⚠️ Alta CA detectada. Verifique desperdício de ração nos comedouros ou sinais clínicos no lote."
                                        : "✅ O lote está performando dentro da curva ideal. Mantenha o manejo nutricional atual."}
                                </p>
                            </div>
                            
                            <div className="text-center pt-4">
                                <div className="text-sm font-medium">Peso Alvo: 110 kg</div>
                                <div className="w-full bg-white/20 h-2 rounded-full mt-2 overflow-hidden">
                                    <div 
                                        className="bg-white h-full transition-all duration-1000" 
                                        style={{ width: `${(metrics.currentWeight / 110) * 100}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="lg:col-span-3">
                    <OperationalTasks />
                </div>
            </div>
        </div>
    );
}
