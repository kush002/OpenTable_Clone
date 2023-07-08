import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password, phone, city } = req.body;

  if (req.method === "POST") {
    const errors: string[] = [];

    const prisma = new PrismaClient();

    //////////////// Server side validating schema //////////////////////////

    const validatorSchema = [
      {
        valid: validator.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "First name is invalid",
      },

      {
        valid: validator.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "Last name is invalid",
      },
      {
        valid: validator.isEmail(email),
        errorMessage: "Email is invalid",
      },
      {
        valid: validator.isMobilePhone(phone),
        errorMessage: "Phone number is invalid",
      },
      {
        valid: validator.isLength(city, {
          min: 1,
        }),
        errorMessage: "City is invalid",
      },
      {
        valid: validator.isStrongPassword(password),
        errorMessage: "Password is invalid",
      },
    ];

    ///////////////////// error handeling ////////////////////////////

    validatorSchema.forEach((value) => {
      if (!value.valid) {
        errors.push(value.errorMessage);
      }
    });

    if (errors.length) return res.status(400).json({ errorMessage: errors[0] });

    const userWithEmail = await prisma.user.findUnique({
      where: { email },
    });

    //////////////////////////////// user alredy exist//////////////////////////

    if (userWithEmail) {
      return res
        .status(400)
        .json({ errorMessage: "Email is associated with another account" });
    }

    ////////////////////////// hasing password ////////////////////////////////////

    const hashedPassword = await bcrypt.hash(password, 12);

    ///////////////////////////// creating user ///////////////////////////////////

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
        city: city,
        password: hashedPassword,
      },
    });

    /////////////////////////////// JWT TOKEN usin jose ///////////////////////////////////

    const alg = "HS256";

    const secret = new TextEncoder().encode(process.env.JSON_SECRET);

    const token = await new jose.SignJWT({ email: user.email })
      .setProtectedHeader({ alg })
      .setExpirationTime("24h")
      .sign(secret);

    //////////////////////////////// signup successful ///////////////////////////////////////

    setCookie("jwt", token, { req, res, maxAge: 60 * 6 * 24 });

    return res.status(200).json({
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      city: user.city,
      phone: user.phone,
    });
  }

  return res.status(404).json("Unknown endpoint");
};

export default handler;
