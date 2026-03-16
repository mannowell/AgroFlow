# 🚜 AgroFlow

**AgroFlow** é uma plataforma de Gestão de Pecuária, desenhada para pecuaristas que buscam maximizar o desempenho produtivo e financeiro de seus lotes através de dados reais e execução operacional impecável.

![Versão 2.0](https://img.shields.io/badge/AgroFlow-v2.0-emerald)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Prisma](https://img.shields.io/badge/Prisma-ORM-indigo)

## ✨ Principais Recursos

- **📈 Dashboard Zootécnico**: Monitore Conversão Alimentar (CA), Ganho de Peso Diário (GPD) e Taxa de Mortalidade em tempo real.
- **💰 Projeção Financeira**: Saiba o lucro estimado do seu lote antes mesmo dele ir para o abate, baseado em benchmarks de mercado e consumo de ração.
- **✅ Gestão Operacional**: Um sistema de tarefas integrado diretamente ao manejo do lote (Vacinação, Pesagem, Ajustes de Dieta).
- **📊 Curvas de Crescimento**: Compare o desempenho real dos seus animais contra as curvas ideais (PIC/Topigs).
- **💎 UI Premium**: Interface moderna, responsiva e otimizada para o campo, desenvolvida com Radix UI e Framer Motion.

## 🚀 Tecnologias

- **Framework**: Next.js 14 (App Router)
- **Estilização**: Tailwind CSS + Shadcn UI
- **Banco de Dados**: SQLite com Prisma ORM
- **Gráficos**: Recharts para visualização de dados zootécnicos
- **Animações**: Framer Motion para uma experiência fluida

## 🛠️ Começando

### Pré-requisitos

- Node.js 18+ instalado
- NPM ou PNPM

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agroflow.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure o banco de dados:
```bash
npx prisma generate
npx prisma db push
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver a plataforma em ação.

## 📂 Estrutura do Projeto

- `/app`: Rotas e lógica do Next.js App Router.
- `/components/agtech`: Componentes principais da plataforma AgroFlow.
- `/lib`: Lógica de cálculos zootécnicos e utilitários.
- `/prisma`: Esquema do banco de dados e migrações.
- `/services`: Configurações de serviços externos (Database, Auth).

---

Desenvolvido para transformar dados em lucratividade no campo. 🌾
