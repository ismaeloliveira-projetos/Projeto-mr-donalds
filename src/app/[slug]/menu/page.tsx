import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import RestaurantCategories from "./components/categories";
import Footer from "./components/footer";
import RestaurantHeader from "./components/header";

interface RestaurantMenuPageProps {
  params: { slug: string };
  searchParams: { consumptionMethod?: string };
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({ params, searchParams }: RestaurantMenuPageProps) => {
  const { slug } = params;
  const consumptionMethod = searchParams.consumptionMethod ?? "DINE_IN";

  if (!isConsumptionMethodValid(consumptionMethod)) {
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
