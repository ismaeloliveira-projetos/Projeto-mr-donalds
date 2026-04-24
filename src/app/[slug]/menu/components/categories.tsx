"use client";

import type { MenuCategory, Product, Restaurant } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";

type RestaurantWithMenu = Restaurant & {
  menuCategories: (MenuCategory & { products: Product[] })[];
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
};

const CART_STORAGE_KEY = "mr-donalds-cart";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

interface RestaurantCategoriesProps {
  restaurant: RestaurantWithMenu;
  consumptionMethod: string;
}

const RestaurantCategories = ({
  restaurant,
  consumptionMethod,
}: RestaurantCategoriesProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedValue = localStorage.getItem(CART_STORAGE_KEY);
    if (!storedValue) {
      return;
    }

    try {
      setCart(JSON.parse(storedValue));
    } catch {
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart, mounted]);

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeoutId = window.setTimeout(() => setFeedback(""), 2200);
    return () => window.clearTimeout(timeoutId);
  }, [feedback]);

  const categories = useMemo(
    () => [...restaurant.menuCategories].sort((a, b) => a.name.localeCompare(b.name)),
    [restaurant.menuCategories]
  );

  const totalItems = useMemo(
    () => cart.reduce((count, item) => count + item.quantity, 0),
    [cart]
  );

  const totalValue = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: 1,
        },
      ];
    });

    setFeedback(`${product.name} adicionado ao carrinho!`);
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (itemId: string) => {
    setCart((current) => current.filter((item) => item.id !== itemId));
    setFeedback("Item removido do carrinho.");
  };

  if (!restaurant.menuCategories.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-slate-800 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Cardápio vazio</p>
        <h2 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Ainda não há produtos cadastrados para este restaurante.
        </h2>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-slate-50 pb-24 pt-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-500">{consumptionMethod === "TAKEAWAY" ? "Para levar" : "Para comer aqui"}</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Escolha seu combo, lanche ou bebida.
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Clicando em adicionar, seu pedido vai direto para o carrinho persistente.
            </p>
          </div>

          <Button
            variant="secondary"
            size="default"
            onClick={() => setIsOpen((current) => !current)}
          >
            <ShoppingCart className="h-4 w-4" />
            {totalItems > 0 ? `${totalItems} item(s) no carrinho` : "Abrir carrinho"}
          </Button>
        </div>

        <div className="grid gap-10">
          {categories.map((category) => (
            <section key={category.id} className="space-y-6">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Cardápio</p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">{category.name}</h3>
                </div>
                <p className="text-sm text-slate-500">
                  {category.products.length} produto(s) disponível(is)
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {category.products.map((product) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -4 }}
                    className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="space-y-4 p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="text-lg font-semibold text-slate-900">{product.name}</h4>
                          <p className="mt-2 text-sm leading-6 text-slate-600">{product.description}</p>
                        </div>
                        <p className="text-lg font-semibold text-amber-500">{formatCurrency(product.price)}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-slate-500">
                        {product.ingredients.length > 0 ? (
                          product.ingredients.slice(0, 3).map((ingredient) => (
                            <span
                              key={ingredient}
                              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1"
                            >
                              {ingredient}
                            </span>
                          ))
                        ) : (
                          <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1">
                            Sem ingredientes adicionais
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <Button size="default" onClick={() => addToCart(product)}>
                          Adicionar ao carrinho
                        </Button>
                        <span className="text-sm text-slate-500">
                          {cart.find((item) => item.id === product.id)?.quantity ?? 0} no carrinho
                        </span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {feedback ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="fixed inset-x-4 top-6 z-50 rounded-3xl border border-amber-200 bg-amber-50/95 px-5 py-4 shadow-xl shadow-amber-200/40 backdrop-blur"
          >
            <div className="flex items-center justify-between gap-4 text-sm font-medium text-amber-900">
              <span>{feedback}</span>
              <button type="button" onClick={() => setFeedback("")}> 
                <X className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-x-4 bottom-4 z-50 rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/40 backdrop-blur sm:bottom-8 sm:right-8 sm:left-auto sm:w-[420px]"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-amber-500">Carrinho</p>
                <p className="mt-1 text-sm text-slate-600">{totalItems} item(s) selecionado(s)</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-slate-200 bg-slate-100 p-2 text-slate-600 transition hover:bg-slate-200"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-6">
              {cart.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-sm text-slate-500">
                  Seu carrinho está vazio. Adicione itens ao lado.
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-3xl bg-slate-100">
                          <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold text-slate-900">{item.name}</p>
                          <p className="mt-1 text-sm text-slate-600">{formatCurrency(item.price)} cada</p>
                          <div className="mt-3 flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-semibold text-slate-900">{item.quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:bg-slate-100"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-6 rounded-3xl bg-slate-950 px-5 py-5 text-white shadow-lg shadow-slate-950/10">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Total</span>
                <span className="text-base font-semibold text-white">{formatCurrency(totalValue)}</span>
              </div>
              <Button
                size="lg"
                className="mt-5 w-full"
                disabled={cart.length === 0}
              >
                Finalizar pedido
              </Button>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
};

export default RestaurantCategories;
