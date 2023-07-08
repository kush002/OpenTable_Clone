import { NextApiRequest, NextApiResponse } from "next";
import React from "react";
import * as jose from "jose";
import jwt from "jsonwebtoken";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const bearerToken = req.headers["authorization"] as string;

  const token = bearerToken.split(" ")[1];

  const payload = jwt.decode(token) as { email: string };

  if (!payload) {
    return res.status(400).json({ errorMessage: "Unauthorized request" });
  }

  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    select: {
      id: true,
      first_name: true,
      last_name: true,
      email: true,
      city: true,
      phone: true,
    },
  });

  if (!user) {
    return res.status(401).json({ errorMessage: "User not exist" });
  }

  return res
    .status(200)
    .json({
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      city: user.city,
      phone: user.phone,
      email: user.email,
    });
};

export default handler;
