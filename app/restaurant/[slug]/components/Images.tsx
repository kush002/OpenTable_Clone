import React from "react";
interface Prop {
  images: string[];
}
const Images = ({ images }: Prop) => {
  return (
    <div className="text-[#2D333F]">
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">5 Photos</h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <img
            key={image}
            className="w-56 h-44 mr-1 mb-1 rounded "
            src={image}
            alt=""
          />
        ))}
      </div>
    </div>
  );
};

export default Images;
