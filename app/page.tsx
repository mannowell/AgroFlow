"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { CheckCircle2, Rocket, Shield, Zap, ArrowRight, Github, TrendingUp } from "lucide-react";
import Link from "next/link";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center border-b backdrop-blur-md bg-background/80 sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2 hover:opacity-80 transition-opacity" href="#">
          <div className="bg-primary p-1.5 rounded-lg">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl tracking-tight">AgroFlow</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors mt-2" href="#features">
            Recursos
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors mt-2" href="#pricing">
            Preços
          </Link>
          <Link href="/app">
            <Button variant="ghost" size="sm">Entrar</Button>
          </Link>
          <Link href="/app">
            <Button size="sm" className="hidden sm:inline-flex">Começar Agora</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 px-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
          <div className="absolute h-full w-full bg-background [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]" />
          
          <motion.div 
            className="container px-4 md:px-6 flex flex-col items-center text-center space-y-8"
            initial="initial"
            animate="animate"
            variants={stagger}
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="px-4 py-1.5 border-primary/20 bg-primary/5 text-primary rounded-full font-medium">
                ✨ Versão 2.0 agora disponível
              </Badge>
            </motion.div>
            
            <motion.div className="space-y-4" variants={fadeInUp}>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/50">
                Performance Zootécnica com <br className="hidden md:block" />
                <span className="text-primary italic">Precisão</span> e Lucratividade.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-2xl/relaxed">
                A plataforma de gestão para pecuaristas que buscam excelência operacional, não apenas planilhas.
              </p>
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4" variants={fadeInUp}>
              <Link href="/app">
                <Button size="lg" className="h-12 px-8 text-base transition-all hover:scale-105 active:scale-95 group">
                  Criar minha conta gratuita
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-8 text-base">
                Ver demonstração
              </Button>
            </motion.div>

            <motion.div 
              className="w-full max-w-5xl mt-16 p-4 rounded-2xl border bg-card/50 backdrop-blur-xl shadow-2xl relative group overflow-hidden"
              variants={fadeInUp}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-dashed border-2 text-muted-foreground">
                 [ Dashboard Preview - Rendered App Layout ]
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-24 bg-muted/30 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Por que escolher o AgroFlow?</h2>
              <p className="max-w-[800px] text-muted-foreground md:text-xl lg:text-base xl:text-xl">
                Ferramentas de precisão para maximizar o ganho de peso e a eficiência alimentar do seu rebanho.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Performance Ultra-rápida",
                  desc: "Desenvolvido com Next.js 14 para interações instantâneas e sem latência.",
                  icon: Zap,
                },
                {
                  title: "Segurança Total",
                  desc: "Seus dados são criptografados e protegidos com os mais altos padrões de segurança.",
                  icon: Shield,
                },
                {
                  title: "Fluxo Contínuo",
                  desc: "Server Actions garantem que sua produtividade nunca seja interrompida por loadings.",
                  icon: Rocket,
                }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="border-none bg-background shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                    <CardContent className="p-8 space-y-4">
                      <div className="bg-primary/10 p-3 w-fit rounded-xl">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.desc}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/5 -z-10" />
          <div className="container px-4 md:px-6 flex flex-col items-center justify-center text-center space-y-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl max-w-2xl">
              Pronto para retomar o controle do seu tempo?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              Junte-se a milhares de profissionais que já simplificaram sua rotina.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/app">
                <Button size="lg" className="h-14 px-10 text-lg">
                  Começar gratuitamente
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-4 md:px-6 border-t flex flex-col md:flex-row items-center justify-between gap-6 bg-background">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg">AgroFlow</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2024 AgroFlow. Todos os direitos reservados.
        </p>
        <div className="flex gap-4">
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
