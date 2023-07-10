import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";
import React from "react";

export const middleware = async (req: NextRequest, res: NextResponse) => {
  const bearerToken = req.headers.get("authorization") as string;

  if (!bearerToken) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 400 }
    );
  }

  const token = bearerToken.split(" ")[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 400 }
    );
  }

  const secret = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

  try {
    await jose.jwtVerify(token, secret);
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ errorMessage: "Unauthorized request" }),
      { status: 400 }
    );
  }
};

export const config = {
  matcher: ["/api/auth/me"],
};
