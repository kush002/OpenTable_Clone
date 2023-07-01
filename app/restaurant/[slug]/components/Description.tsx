import React from "react";
interface Prop {
  desc: string;
}
const Description = ({ desc }: Prop) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{desc}</p>
    </div>
  );
};

export default Description;
