import React from "react";

interface Prop {
  title: string;
}
const Title = ({ title }: Prop) => {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl text-[#2D333F]">{title}</h1>
    </div>
  );
};

export default Title;
