import { Review } from "@prisma/client";
import React from "react";
import Stars from "../../../components/Stars";
import Reviews from "./Reviews";

const ReviewCard = ({ review }: { review: Review }) => {
  return (
    <div className="border-b p-7 mb-7 ">
      <div className="flex ">
        <div className="w-1/6 flex flex-col items-center ">
          <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
            <h2 className="text-white text-2xl">{`${review.first_name[0]}${review.last_name[0]}`}</h2>
          </div>
          <p className="text-center font-[500] text-gray-500 mt-2">
            {`${review.first_name} ${review.last_name}`}
          </p>
        </div>
        <div className="w-5/6 ml-10 ">
          <div className="flex items-center">
            <Stars Individualrating={review.rating} reviews={[]} />
          </div>
          <div className="mt-5">
            <p className="text-lg font-light">{review.text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
