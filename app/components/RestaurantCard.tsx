import Link from "next/link";
import React from "react";
import { RestaurantTypeCard } from "../page";
import Price from "./Price";

interface Props {
  restaurant: RestaurantTypeCard;
}

const RestaurantCard = ({ restaurant }: Props) => {
  return (
    <Link href={`/restaurant/${restaurant.slug}`}>
      <div className="w-64 h-72 m-3 rounded overflow-hidden cursor-pointer border">
        <img
          src={restaurant.main_image}
          alt={`${restaurant.name}_image`}
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurant.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2 text-red-600">⭐⭐⭐⭐⭐</div>
            <p className="ml-2">599 reviews</p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurant.cuisine.name}</p>
            <Price price={restaurant.price} />
            <p>{restaurant.location.name}</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 21 times today</p>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
