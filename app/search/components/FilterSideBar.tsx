import React from "react";

const FilterSideBar = () => {
  return (
    <div className="w-1/5">
      <div className="border-b pb-4">
        <h1 className="mb-2 font-[500]">Region</h1>
        <p className="font-light text-reg">Rajasthan</p>
        <p className="font-light text-reg">Delhi</p>
        <p className="font-light text-reg">Himachal Pradesh</p>
        <p className="font-light text-reg">Gujrat</p>
        <p className="font-light text-reg">Maharashtra</p>
        <p className="font-light text-reg">Karnataka</p>
      </div>
      <div className="border-b pb-4 mt-3">
        <h1 className="mb-2 font-[500]">Cuisine</h1>
        <p className="font-light text-reg">Rajasthani</p>
        <p className="font-light text-reg">North Indian</p>
        <p className="font-light text-reg">South Indian</p>
      </div>
      <div className="mt-3 pb-4">
        <h1 className="mb-2 font-[500]">Price</h1>
        <div className="flex">
          <button className="border w-full text-reg font-light rounded-l p-2">
            $
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light p-2">
            $$
          </button>
          <button className="border-r border-t border-b w-full text-reg font-light rounded-r p-2">
            $$$
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSideBar;
