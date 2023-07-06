import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { firstName, lastName, email, password, phone, city } = req.body;

  const errors: string[] = [];

  const prisma = new PrismaClient();

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

  validatorSchema.forEach((value) => {
    if (!value.valid) {
      errors.push(value.errorMessage);
    }
  });

  if (errors.length) return res.status(400).json({ errorMessage: errors[0] });

  const userWithEmail = await prisma.user.findUnique({
    where: { email },
  });

  if (userWithEmail) {
    return res
      .status(400)
      .json({ errorMessage: "Email is associated with another account" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

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

  res.status(200).json({ message: user });
};

export default handler;
