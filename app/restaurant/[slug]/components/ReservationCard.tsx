"use client";
import React from "react";

const ReservationCard = () => {
  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col text-gray-700 font-[500]">
          <label htmlFor="">Party size</label>
          <select name="" className="py-3 border-b font-light " id="">
            <option value="">2 Person</option>
            <option value="">3 Person</option>
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="" className="text-gray-700 font-[500]">
              Date
            </label>
            <input type="text" className="py-2 border-b font-light w-28" />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="" className="text-gray-700 font-[500]">
              Time
            </label>
            <select className="py-2 border-b font-light w-28">
              <option value="">7:30 AM</option>
              <option value="">9:30 AM</option>
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button className="bg-red-600 w-full rounded px-4 text-white font-bold h-14">
            Find a Time
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
