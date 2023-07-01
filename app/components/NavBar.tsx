"use client";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      <div>
        <div className="flex">
          <button className="bg-[#247F9E] text-white border p-1 px-4 rounded mr-3 ">
            Sign In
          </button>
          <button className="border p-1 px-4 rounded">Sign Up</button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
