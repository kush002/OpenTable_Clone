import { Cuisine, Location, PRICE, Restaurant } from "@prisma/client";
import Link from "next/link";
import React from "react";

interface RestauranatsType {
  location: Location;
  cuisine: Cuisine;
}

const FilterSideBar = ({
  locations,
  cuisine,
  searchParams,
}: {
  locations: Location[];
  cuisine: Cuisine[];
  searchParams: { city?: string; cuisine?: string; price?: PRICE };
}) => {
  const prices = [
    {
      price: PRICE.CHEAP,
      label: "$",
      className: "border w-full text-reg font-light rounded-l p-2 text-center",
    },
    {
      price: PRICE.REGULAR,
      label: "$$",
      className:
        "border-r border-t border-b w-full text-reg font-light p-2 text-center",
    },
    {
      price: PRICE.EXPENSIVE,
      label: "$$$",
      className:
        "border-r border-t border-b w-full text-reg font-light rounded-r p-2 text-center",
    },
  ];
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2 font-[500]">Region</h1>
        {locations.map((location) => (
          <div key={location.id} className="block">
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, city: location.name },
              }}
              className="font-light text-reg capitalize hover:underline "
            >
              {location.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2 font-[500]">Cuisine</h1>

        {cuisine.map((cuisineName) => (
          <div key={cuisineName.id} className="block">
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, cuisine: cuisineName.name },
              }}
              className="font-light text-reg capitalize hover:underline"
            >
              {cuisineName.name}
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2 font-[500]">Price</h1>
        <div className="flex">
          {prices.map((price) => (
            <Link
              href={{
                pathname: "/search",
                query: { ...searchParams, price: price.price },
              }}
              className={price.className}
            >
              {price.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
