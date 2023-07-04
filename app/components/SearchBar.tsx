"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchBar = () => {
  const [location, setLocation] = useState<string>("");

  const router = useRouter();
  return (
    <div className=" text-left py-3 m-auto flex justify-center">
      <input
        type="text"
        className="text-s font-[500] mr-3 w-[450px] p-2 rounded"
        placeholder="Location, Restaurant, or Cuisine"
        onChange={(e) => {
          setLocation(e.target.value);
        }}
      />
      <button
        className="bg-[#DA3743] px-9 py-2 rounded text-white font-bold"
        onClick={() => {
          if (location === "") return;
          router.push(`/search?city=${location}`);
        }}
      >
        Let's go
      </button>
    </div>
  );
};

export default SearchBar;
