import { Cuisine, Location, PRICE, Review } from "@prisma/client";
import Link from "next/link";
import React from "react";
import Price from "../../components/Price";
import calculateReviewRatingAvg from "../../../utils/calculateReviewRatingAvg";
import Stars from "../../components/Stars";

interface RestauranatType {
  id: number;
  name: string;
  location: Location;
  main_image: string;
  price: PRICE;
  cuisine: Cuisine;
  slug: string;
  reviews: Review[];
}

const RestaurantCard = ({ restaurant }: { restaurant: RestauranatType }) => {
  const renderRatinfText = () => {
    const rating = calculateReviewRatingAvg(restaurant.reviews);

    if (rating > 4) return "Awesome";
    else if (rating <= 4 && rating > 3) return "Good";
    else if (rating <= 3 && rating > 2) return "Average";
    else return "";
  };

  return (
    <div className="w-5/6 ml-5">
      <div className="border-b flex pb-5 ">
        <img src={restaurant.main_image} className="w-44 h-36 rounded" alt="" />
        <div className="pl-5 mb-3">
          <h2 className="text-3xl font-[500] text-[#247F9E]">
            {restaurant.name}
          </h2>
          <div className="flex items-center">
            <Stars reviews={restaurant.reviews} Individualrating={0} />
            <p className="ml-2 mb-2 text-sm font-[500]">{renderRatinfText()}</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <p className="mr-4">
                <Price price={restaurant.price} />
              </p>
              <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
              <p className="mr-4 capitalize">{restaurant.location.name}</p>
            </div>
          </div>
          <div className="text-red-600">
            <Link href={`/restaurant/${restaurant.slug}`}>
              View more information
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
