import { Review } from "@prisma/client";
import React from "react";
import ReviewCard from "./ReviewCard";

const Reviews = ({ reviews }: { reviews: Review[] }) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-7 mb-7 border-b pb-5 text-[#2D333F]">
        {`What ${reviews.length} people are saying`}
      </h1>
      <div>
        {/* Review Card */}

        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
        {/* Review Card */}
      </div>
    </div>
  );
};

export default Reviews;
