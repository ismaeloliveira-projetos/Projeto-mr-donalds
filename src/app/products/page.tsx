import Image from "next/image";
import Link from "next/link";

import { db } from "@/lib/prisma";

const ProductsPage = async () => {
  const products = await db.product.findMany({
    take: 9,
    orderBy: { name: "asc" },
    include: { menuCategory: true },
  });

  return (
    <main className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Produtos</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">Explore os itens do cardápio</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600">
              Lista rápida com os produtos do restaurante, para testar a navegação e o visual do catálogo.
            </p>
          </div>
          <Link
            href="/fsw-donalds"
            className="inline-flex rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Abrir cardápio
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
            >
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-500">
                  {product.menuCategory?.name ?? "Sem categoria"}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-slate-900">{product.name}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-600">{product.description}</p>
                <div className="mt-6 flex items-center justify-between text-sm font-semibold text-slate-900">
                  <span>{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ProductsPage;