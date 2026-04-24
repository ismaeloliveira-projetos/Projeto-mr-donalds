import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";
import { isValidConsumptionMethod } from "@/lib/prisma-types";

import RestaurantCategories from "./components/categories";
import Footer from "./components/footer";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod?: string }>;
}

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod = "DINE_IN" } = await searchParams;

  if (!isValidConsumptionMethod(consumptionMethod)) {
    return notFound();
  }

  const restaurant = await db.restaurant.findUnique({
    where: { slug },
    include: {
      menuCategories: {
        include: { products: true },
      },
    },
  });

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="bg-slate-50">
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} consumptionMethod={consumptionMethod.toUpperCase()} />
      <Footer />
    </div>
  );
};

export default RestaurantMenuPage;
