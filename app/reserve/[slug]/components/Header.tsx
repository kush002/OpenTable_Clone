import React from "react";

const Header = () => {
  return (
    <div>
      <h3 className="font-bold text-gray-700">You're almost done!</h3>
      <div className="mt-5 flex">
        <img
          src="https://images.otstatic.com/prod1/48225994/3/small.jpg"
          className="w-32 h-18 rounded"
          alt=""
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold text-gray-700">Aloha Stakehouse</h1>
          <div className="flex mt-3">
            <p className="mr-6 font-[500]">Sat, Jul 01</p>
            <p className="mr-6 font-[500]">8:45 PM</p>
            <p className="mr-6 font-[500]">2 People</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
