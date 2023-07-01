import React from "react";

const ReviewCard = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-7 mb-7 border-b pb-5 text-[#2D333F]">
        What 599 people are saying
      </h1>
      <div>
        {/* Review Card */}
        <div className="border-b p-7 mb-7 ">
          <div className="flex ">
            <div className="w-1/6 flex flex-col items-center ">
              <div className="rounded-full bg-blue-400 w-16 h-16 flex items-center justify-center">
                <h2 className="text-white text-2xl">MJ</h2>
              </div>
              <p className="text-center font-[500] text-gray-500 mt-2">
                Micheal Jordan
              </p>
            </div>
            <div className="w-5/6 ml-10 ">
              <div className="flex items-center">
                <div className="flex mr-5">⭐⭐⭐⭐⭐</div>
              </div>
              <div className="mt-5">
                <p className="text-lg font-light">
                  We had a wonderful locomoco meal for the family! I recommend
                  getting there early bc it was packed when we left. It also
                  filled my fancy drink fix
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Review Card */}
      </div>
    </div>
  );
};

export default ReviewCard;
