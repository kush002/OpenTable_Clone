"use client";
import React, { useState } from "react";
import { partySize, times } from "../../../../data/index";
import DatePicker from "react-datepicker";

const ReservationCard = ({
  openTime,
  closeTime,
}: {
  openTime: string;
  closeTime: string;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      return setSelectedDate(date);
    }
    return setSelectedDate(null);
  };

  const findRestaurantOpenWindowTime = () => {
    const timeWithinWindow: typeof times = [];

    let isWithinTime = false;

    times.forEach((time) => {
      if (time.time === openTime) {
        isWithinTime = true;
      }
      if (isWithinTime) {
        timeWithinWindow.push(time);
      }
      if (time.time === closeTime) {
        isWithinTime = false;
      }
    });
    return timeWithinWindow;
  };
  return (
    <div className="w-[27%] relative text-reg">
      <div className="fixed w-[15%] bg-white rounded p-3 shadow">
        <div className="text-center border-b pb-2 font-bold">
          <h4 className="mr-7 text-lg">Make a Reservation</h4>
        </div>
        <div className="my-3 flex flex-col text-gray-700 font-[500]">
          <label htmlFor="">Party size</label>
          <select name="" className="py-3 border-b font-light " id="">
            {partySize.map((size) => (
              <option value={size.value}>{size.label}</option>
            ))}
          </select>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col w-[48%]">
            <label htmlFor="" className="text-gray-700 font-[500]">
              Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={handleChangeDate}
              className="py-2 border-b font-light text-reg w-28"
              dateFormat={"MMMM d"}
              wrapperClassName="w-[48%]"
            />
          </div>
          <div className="flex flex-col w-[48%]">
            <label htmlFor="" className="text-gray-700 font-[500]">
              Time
            </label>
            <select className="py-2 border-b font-light w-28">
              {findRestaurantOpenWindowTime().map((time) => (
                <option value={time.time}>{time.displayTime}</option>
              ))}
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
