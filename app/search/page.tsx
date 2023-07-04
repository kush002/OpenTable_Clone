import React from "react";
import NavBar from "../components/NavBar";
import Header from "./components/Header";
import FilterSideBar from "./components/FilterSideBar";
import RestaurantCard from "./components/RestaurantCard";
import { Cuisine, Location, PRICE, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const fetchRestaurant = (
  city: string | undefined,
  cuisine: string | undefined,
  price: PRICE | undefined
) => {
  const select = {
    id: true,
    name: true,
    location: true,
    main_image: true,
    price: true,
    cuisine: true,
    slug: true,
    reviews: true,
  };
  if (!city) return prisma.restaurant.findMany({ select });
  return prisma.restaurant.findMany({
    where: {
      location: { name: { equals: city.toLowerCase() } },
      cuisine: { name: { equals: cuisine?.toLowerCase() } },
      price: { equals: price },
    },
    select,
  });
};

const fetchlocation = () => {
  return prisma.location.findMany();
};

const fetchCuisine = () => {
  return prisma.cuisine.findMany();
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const restaurants = await fetchRestaurant(
    searchParams.city,
    searchParams.cuisine,
    searchParams.price
  );

  const locations = await fetchlocation();
  const cuisine = await fetchCuisine();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-start items-start">
        <FilterSideBar
          locations={locations}
          cuisine={cuisine}
          searchParams={searchParams}
        />
        {restaurants.length ? (
          <div className="flex-col w-full">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        ) : (
          <div>Sorry, we do not have list of this sity restaurant!</div>
        )}
      </div>
    </>
  );
};

export default SearchPage;
