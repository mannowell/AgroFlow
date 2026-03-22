export const dynamic = "force-dynamic";

import { auth } from "@/services/auth";
import { prisma } from "@/services/database";
import { redirect } from "next/navigation";
import { AgtechDashboard } from "@/components/agtech/dashboard";
import { NewBatchDialog } from "./_components/new-batch-dialog";
import { LogOut, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
    // Para o MVP: Simular sessão para evitar erro de Nodemailer não configurado
    const session = { user: { id: "mock-id", email: "produtor@agrotech.com" } };

    // Para o MVP: Busca o primeiro lote do usuário ou cria um dummy se não houver
    let batch = await prisma.batch.findFirst({
        where: { userId: session.user.id },
        include: { logs: { orderBy: { weekNumber: 'asc' } } }
    });

    if (!batch) {
        batch = {
            id: "dummy",
            name: "Lote Norte - 5000 Cabeças",
            startDate: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
            initialQuantity: 5000,
            initialAvgWeight: 25,
            logs: [
                { weekNumber: 1, feedConsumed: 12000, deaths: 2, currentAvgWeight: 32 },
                { weekNumber: 2, feedConsumed: 14500, deaths: 1, currentAvgWeight: 39 },
                { weekNumber: 3, feedConsumed: 18000, deaths: 5, currentAvgWeight: 47 },
                { weekNumber: 4, feedConsumed: 22000, deaths: 3, currentAvgWeight: 56 },
                { weekNumber: 5, feedConsumed: 26000, deaths: 2, currentAvgWeight: 66 },
                { weekNumber: 6, feedConsumed: 31000, deaths: 4, currentAvgWeight: 78 },
            ] as any
        } as any;
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="px-6 h-16 flex items-center border-b bg-card/80 backdrop-blur-xl sticky top-0 z-50">
                <div className="flex items-center gap-2">
                    <div className="bg-primary p-1.5 rounded-lg shadow-lg shadow-primary/20">
                        <TrendingUp className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="font-bold text-xl tracking-tight hidden sm:block">AgroFlow</span>
                </div>
                
                <nav className="ml-8 hidden md:flex items-center gap-6">
                    <Link href="/app" className="text-sm font-semibold transition-colors text-primary border-b-2 border-primary pb-1 mt-1">
                        Dashboard Engorda
                    </Link>
                </nav>

                <div className="ml-auto flex items-center gap-4">
                    <NewBatchDialog />
                    <Link href="/">
                      <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                           <LogOut className="h-4 w-4 mr-2" /> Sair
                      </Button>
                    </Link>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
                <AgtechDashboard batch={batch} />
            </main>
        </div>
    );
}