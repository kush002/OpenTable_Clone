import React from "react";

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-[#1B2850] to-[#646E88] p-2">
      {/* SearchBar */}
      <div className=" text-left py-3 m-auto flex justify-center">
        <input
          type="text"
          className="text-s font-[500] mr-3 w-[450px] p-2 rounded"
          placeholder="Location, Restaurant, or Cuisine"
        />
        <button className="bg-[#DA3743] px-9 py-2 rounded text-white font-bold">
          Let's go
        </button>
      </div>
      {/* SearchBar */}
    </div>
  );
};

export default Header;
