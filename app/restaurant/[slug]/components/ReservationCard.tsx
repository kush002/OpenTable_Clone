"use client";
import React, { useState } from "react";
import { partySize as partySizes, times } from "../../../../data/index";
import DatePicker from "react-datepicker";
import useAvailability from "../../../../hooks/useAvailability";
import { CircularProgress } from "@mui/material";
import Link from "next/link";
import { convertToDisplayTime } from "../../../../utils/convertToDisplayTime";

const ReservationCard = ({
  openTime,
  closeTime,
  slug,
}: {
  openTime: string;
  closeTime: string;
  slug: string;
}) => {
  const currentDate = new Date();
  const istOffset = 330 * 60 * 1000; // IST offset is 5 hours 30 minutes ahead of UTC
  currentDate.setTime(currentDate.getTime() + istOffset);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const { loading, data, error, fetchAvailabilities } = useAvailability();
  const [time, setTime] = useState(openTime);
  const [partySize, setPartySize] = useState("2");
  const [day, setDay] = useState(currentDate.toISOString().split("T")[0]);
  console.log(day);
  const handleClick = () => {
    fetchAvailabilities({ slug, time, day, partySize });
  };

  const handleChangeDate = (date: Date | null) => {
    if (date) {
      const day = date.toISOString().split("T")[0];
      setDay(day);
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
          <select
            name=""
            className="py-3 border-b font-light "
            value={partySize}
            onChange={(e) => setPartySize(e.target.value)}
          >
            {partySizes.map((size) => (
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
            <select
              className="py-2 border-b font-light w-28"
              value={time}
              onChange={(e) => {
                setTime(e.target.value);
              }}
            >
              {findRestaurantOpenWindowTime().map((t) => (
                <option value={t.time}>{t.displayTime}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-5">
          <button
            className="bg-red-600 w-full rounded px-4 text-white font-bold h-14"
            onClick={handleClick}
          >
            {loading ? <CircularProgress color="inherit" /> : "Find a Time"}
          </button>
        </div>
        {data && data.length ? (
          <div className="mt-4">
            <p className="text-reg ">Select a Time</p>
            <div className="flex flex-wrap mt-2">
              {data.map((time) => {
                return time.available ? (
                  <Link
                    href={`/reserve/${slug}?date=${day}T${time.time}&partySize=${partySize}`}
                    className="bg-red-600 cursor-pointer p-2 w-24 text-center text-white mb-3 rounded mr-3"
                  >
                    <p className="text-sm font-bold">
                      {convertToDisplayTime(time.time)}
                    </p>
                  </Link>
                ) : (
                  <div className="bg-gray-300 p-2 w-24 mb-3 rounded mr-3"></div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReservationCard;
