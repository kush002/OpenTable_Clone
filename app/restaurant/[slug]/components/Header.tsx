import React from "react";

const Header = ({ name }: { name: string }) => {
  const nameArray = name.split("-");
  nameArray[nameArray.length - 1] = `(${nameArray[nameArray.length - 1]})`;
  name = nameArray.join(" ");

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#1B2850] to-[#646E88] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-center shadow-black">
          {name}
        </h1>
      </div>
    </div>
  );
};

export default Header;
