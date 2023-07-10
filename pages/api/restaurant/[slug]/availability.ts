import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import { times } from "../../../../data";
import { PrismaClient } from "@prisma/client";
import { serialize } from "v8";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({ errorMessage: "Invalid data Provided" });
  }

  const searchTimes = times.find((t) => t.time === time)?.searchTimes;

  if (!searchTimes) {
    return res.status(400).json({ errorMessage: "Invalid Data Provided" });
  }

  const bookings = await prisma.booking.findMany({
    where: {
      booking_time: {
        gte: new Date(`${day}T${searchTimes[0]}`),
        lte: new Date(`${day}T${searchTimes[searchTimes.length - 1]}`),
      },
    },
    select: {
      number_of_people: true,
      booking_time: true,
      tables: true,
    },
  });

  const bookingTableObj: { [key: string]: { [key: number]: true } } = {};

  bookings.map((booking) => {
    bookingTableObj[booking.booking_time.toISOString()] = booking.tables.reduce(
      (obj, table) => {
        return {
          ...obj,
          [table.table_id]: true,
        };
      },
      {}
    );
  });

  const restaurant = await prisma.restaurant.findUnique({
    where: { slug },
    select: {
      tables: true,
    },
  });

  if (!restaurant) {
    return res.status(400).json({ errorMessage: "Invalid Data Provided" });
  }

  const tables = restaurant.tables;

  const searchTimesWithTables = searchTimes.map((searchTime) => {
    return {
      date: new Date(`${day}T${searchTime}`),
      time: searchTime,
      tables,
    };
  });

  searchTimesWithTables.forEach((t) => {
    t.tables = t.tables.filter((table) => {
      if (bookingTableObj[t.date.toISOString()]) {
        if (bookingTableObj[t.date.toISOString()][table.id]) return false;
      }

      return true;
    });
  });

  return res.json({
    searchTimes,
    bookings,
    bookingTableObj,
    tables,
    searchTimesWithTables,
  });
};

export default handler;
// http://localhost:3000/api/restaurant/last-train-to-delhi-ottawa/availability?slug=lastTrain&day=2023-09-07&time=22:30:00.000Z&partySize=6