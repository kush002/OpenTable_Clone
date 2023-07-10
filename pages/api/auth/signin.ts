import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";
import React from "react";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    ///////////// extraction fields from body object ////////////////////////

    const { email, password } = req.body;

    const errors: string[] = [];

    const prisma = new PrismaClient();

    //////////////////// signin validation ////////////////////////

    const validationSchema = [
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is Invalid",
      },
      {
        valid: validator.isLength(password, {
          min: 1,
        }),
        errorMessage: "Password is invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    /////////////////////////error handleing //////////////////////////

    if (errors.length) {
      return res.status(404).json({ message: errors[0] });
    }

    ///////////////////////////check user existance/////////////////////////

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errorMessage: "No user present with this email, Please signup first",
      });
    }

    ///////////////////////////matching password///////////////////////

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(401)
        .json({ errorMessage: "Email or Password is invalid" });
    }

    /////////////////////////////// JWT TOKEN usin jose ///////////////////////////////////

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    });
  }

  return res.status(404).json("unknown endpoint");
};

export default handler;
