import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import Header from "./components/Header";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

const inter = Inter({ subsets: ["latin"] });

export interface RestaurantTypeCard {
  id: number;
  name: string;
  main_image: string;
  cuisine: Cuisine;
  location: Location;
  price: PRICE;
  slug: string;
  description: string;
}

const prisma = new PrismaClient();

const fetchRestaurant = async (): Promise<RestaurantTypeCard[]> => {
  const restaurant = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      price: true,
      slug: true,
      description: true,
    },
  });

  return restaurant;
};

export default async function Home() {
  const restaurants = await fetchRestaurant();

  // console.log({ restaurants });

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
      {/* Cards */}
    </main>
  );
}
