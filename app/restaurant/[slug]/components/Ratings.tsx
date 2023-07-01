import React from "react";

const Ratings = () => {
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <p>⭐⭐⭐⭐⭐</p>
        <p className="text-reg ml-3">4.3</p>
      </div>
      <div>
        <p className="text-reg ml-3">599 Reviews</p>
      </div>
    </div>
  );
};

export default Ratings;
