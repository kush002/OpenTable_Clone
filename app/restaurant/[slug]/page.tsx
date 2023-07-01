import Link from "next/link";
import React from "react";
import NavBar from "../../components/NavBar";
import Header from "./components/Header";
import RestaurantNavBar from "./components/RestaurantNavBar";
import Title from "./components/Title";
import Ratings from "./components/Ratings";
import Description from "./components/Description";
import Images from "./components/Images";
import ReviewCard from "./components/ReviewCard";
import ReservationCard from "./components/ReservationCard";
import { Location, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  location: Location;
  slug: string;
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurantDetails = await prisma.restaurant.findUnique({
    where: {
      slug,
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      location: true,
      slug: true,
    },
  });

  if (!restaurantDetails) {
    throw new Error("Resturant Not Exist");
  }

  return restaurantDetails;
};

const RestaurantDetailsPage = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);
  console.log("kjshdfkjhkj:" + params.slug);
  console.log(restaurant);
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />
        <Title title={restaurant.name} />
        <Ratings />
        <Description desc={restaurant.description} />
        <Images images={restaurant.images} />
        <ReviewCard />
      </div>

      <ReservationCard />
    </>
  );
};

export default RestaurantDetailsPage;
