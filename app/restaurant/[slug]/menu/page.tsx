import Link from "next/link";
import React from "react";
import NavBar from "../../../components/NavBar";
import Header from "../components/Header";
import RestaurantNavBar from "../components/RestaurantNavBar";
import Menu from "../components/Menu";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchItems = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      items: true,
    },
  });

  if (!restaurant) throw new Error("Resturant not exist");

  return restaurant.items;
};

const MenuPage = async ({ params }: { params: { slug: string } }) => {
  const menuItems = await fetchItems(params.slug);
  console.log({ menuItems });
  return (
    <>
      <div className="bg-white w-[100%] rounded p-3 shadow">
        <RestaurantNavBar name={params.slug} />
        <Menu menu={menuItems} />
      </div>
    </>
  );
};

export default MenuPage;
