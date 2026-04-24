"use client";

import { motion } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.35),_transparent_45%)]" />
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center"
        >
          <div className="space-y-8 lg:max-w-xl">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-sm font-semibold uppercase tracking-[0.35em] text-amber-200 ring-1 ring-white/10">
              Mr Donalds
            </span>
            <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              Fast food digital com carrinho inteligente e design moderno.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-200">
              Explore combos, hambúrgueres e bebidas com uma experiência fluida, carrinho persistente e navegação pensada para mobile e desktop.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/fsw-donalds">Ver cardápio</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/products">Conhecer produtos</Link>
              </Button>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
                <p className="text-sm uppercase tracking-[0.25em] text-amber-300">Sinta o sabor</p>
                <h2 className="mt-4 text-3xl font-semibold text-white">Cardápio completo em um clique</h2>
                <p className="mt-3 text-slate-300">
                  Navegação simples, produto rápido e carrinho que lembra seus itens enquanto você escolhe.
                </p>
              </div>
              <div className="grid gap-4 text-slate-200 sm:grid-cols-2">
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-amber-300">Menu com categorias</p>
                  <p className="mt-2 text-base text-slate-200">Combos, lanches, bebidas, fritas e sobremesas.</p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
                  <p className="text-sm text-amber-300">Carrinho persistente</p>
                  <p className="mt-2 text-base text-slate-200">Seus itens ficam salvos no navegador até a próxima visita.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
