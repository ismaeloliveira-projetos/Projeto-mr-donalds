"use client";

import type { Restaurant } from "@prisma/client";
import { ChevronLeftIcon, HomeIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const router = useRouter();

  return (
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-b-[3rem] border-b border-slate-200 bg-slate-950/80 shadow-2xl md:min-h-[420px] lg:min-h-[520px]">
      <Button
        variant="secondary"
        size="icon"
        className="absolute left-4 top-4 z-50 rounded-full bg-white"
        onClick={() => router.back()}
      >
        <ChevronLeftIcon />
      </Button>
      <Button
        variant="secondary"
        size="icon"
        className="absolute right-4 top-4 z-50 rounded-full bg-white"
        onClick={() => router.push("/")}
      >
        <HomeIcon />
      </Button>
      <Image
        src={restaurant.coverImageUrl}
        alt={restaurant.name}
        fill
        className="object-cover brightness-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
      <div className="relative mx-auto flex h-full max-w-7xl items-end p-8 pb-10 text-white sm:p-10 lg:p-14">
        <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-xl shadow-slate-950/40 backdrop-blur-sm">
          <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Mr Donalds</p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Cardápio completo com visual moderno.
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200">
            Navegue pelos combos, lanche e bebidas com um carrinho interativo e persistente.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantHeader;
