import Link from "next/link";
import React from "react";

interface Prop {
  name: string;
}

const RestaurantNavBar = ({ name }: Prop) => {
  return (
    <nav className="flex text-reg border-b pb-2 text-gray-500 font-[500]">
      <Link href={`/restaurant/${name}`} className="mr-7 ">
        Overview
      </Link>
      <Link href={`/restaurant/${name}/menu`} className="mr-7">
        Menu
      </Link>
    </nav>
  );
};

export default RestaurantNavBar;
