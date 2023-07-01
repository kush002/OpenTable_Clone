import Link from "next/link";
import React from "react";

interface Prop {
  slug: string;
}

const RestaurantNavBar = ({ slug }: Prop) => {
  return (
    <nav className="flex text-reg border-b pb-2 text-gray-500 font-[500]">
      <Link href={`/restaurant/${slug}`} className="mr-7 ">
        Overview
      </Link>
      <Link href={`/restaurant/${slug}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNavBar;
