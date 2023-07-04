import React from "react";
import fullStar from "../../public/icons/full-star.png";
import halfStar from "../../public/icons/half-star.png";
import emptyStart from "../../public/icons/empty-star.png";
import { Review } from "@prisma/client";
import calculateReviewRatingAvg from "../../utils/calculateReviewRatingAvg";
import Image from "next/image";
import Ratings from "../restaurant/[slug]/components/Ratings";

const Stars = ({
  reviews,
  Individualrating,
}: {
  reviews: Review[];
  Individualrating: number;
}) => {
  let rating: number;
  if (reviews.length > 0) {
    rating = calculateReviewRatingAvg(reviews);
  } else {
    rating = Individualrating;
  }

  const renderStars = () => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
      const difference = parseFloat((rating - i).toFixed(1));
      if (difference >= 1) stars.push(fullStar);
      else if (difference < 1 && difference > 0) {
        if (difference <= 0.2) stars.push(emptyStart);
        else if (difference >= 0.2 && difference <= 0.6) stars.push(halfStar);
        else stars.push(fullStar);
      } else stars.push(emptyStart);
    }

    return stars.map((star) => (
      <Image src={star} alt="" className="w-4 h-4 mr-1" />
    ));
  };
  return <div className="flex items-center">{renderStars()}</div>;
};

export default Stars;
