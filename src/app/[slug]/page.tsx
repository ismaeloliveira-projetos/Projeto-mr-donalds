import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";

import ConsumptionMethodOption from "./components/consumption-method-option";

type RestaurantPageProps = {
  params: Promise<{ slug: string }>;
};

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/30 to-slate-950" />
        <Image
          src={restaurant.coverImageUrl}
          alt={restaurant.name}
          fill
          className="object-cover opacity-80"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="max-w-2xl rounded-[2rem] border border-white/10 bg-slate-950/80 p-10 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
                  <Image
                    src={restaurant.avatarImageUrl}
                    alt={restaurant.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-300">{restaurant.name}</p>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-slate-300">{restaurant.description}</p>
                </div>
              </div>

              <div className="mt-10 space-y-5">
                <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                  Peça seu lanche favorito com rapidez e estilo.
                </h1>
                <p className="max-w-xl text-base leading-8 text-slate-300">
                  Escolha o modo de consumo, acesse o cardápio completo e use o carrinho persistente para montar seu pedido sem perder o progresso.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg">
                  <Link href={`/${slug}/menu?consumptionMethod=dine_in`}>Para comer aqui</Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={`/${slug}/menu?consumptionMethod=takeaway`}>Para levar</Link>
                </Button>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/10 p-8 shadow-2xl shadow-black/20 backdrop-blur-xl">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Rápido e intuitivo</p>
              <div className="mt-6 space-y-4 text-slate-200">
                <p>• Visão clara do cardápio com categorias e produtos.</p>
                <p>• Carrinho persistente salva seu pedido no navegador.</p>
                <p>• Layout responsivo preparado para mobile ou desktop.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ConsumptionMethodOption
            slug={slug}
            option="DINE_IN"
            buttonText="Para comer aqui"
            imageAlt="Comer aqui"
            imageUrl="/dine_in.png"
          />
          <ConsumptionMethodOption
            slug={slug}
            option="TAKEAWAY"
            buttonText="Para levar"
            imageAlt="Para levar"
            imageUrl="/takeaway.png"
          />
        </div>
      </div>
    </div>
  );
};

export default RestaurantPage;
