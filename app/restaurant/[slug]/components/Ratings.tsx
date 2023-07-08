import { Review } from "@prisma/client";
import React from "react";
import Stars from "../../../components/Stars";

const Ratings = ({ reviews }: { reviews: Review[] }) => {
  let ratingSum = 0;

  reviews.forEach((review, i) => {
    ratingSum += review.rating;
  });

  const totalRating = ratingSum / reviews.length;

  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars reviews={reviews} Individualrating={0} />
        <p className="text-reg ml-3">{totalRating.toFixed(1)}</p>
      </div>
      <div>
        <p className="text-reg ml-3">{`${reviews.length} ${
          reviews.length === 1 ? "Review" : "Reviews"
        }`}</p>
      </div>
    </div>
  );
};

export default Ratings;
