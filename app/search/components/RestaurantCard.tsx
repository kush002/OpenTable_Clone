import Link from "next/link";
import React from "react";

const RestaurantCard = () => {
  return (
    <div className="w-5/6 ml-5">
      <div className="border-b flex pb-5 ">
        <img
          src="https://resizer.otstatic.com/v2/photos/wide-huge/3/48225994.webp"
          className="w-44 rounded"
          alt=""
        />
        <div className="pl-5 mb-3">
          <h2 className="text-3xl font-[500] text-[#247F9E]">
            Aloha Steakhouse
          </h2>
          <div className="flex items-center">
            <div className="flex mb-2">⭐⭐⭐⭐⭐</div>
            <p className="ml-2 mb-2 text-sm font-[500]">Awesome</p>
          </div>
          <div className="mb-9">
            <div className="font-light flex text-reg">
              <p className="mr-4">$$$</p>
              <p className="mr-4">Steakhouse</p>
              <p className="mr-4">Waikiki</p>
            </div>
          </div>
          <div className="text-red-600">
            <Link href="/restaurant/:slug">View more information</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
