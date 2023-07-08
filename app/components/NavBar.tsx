"use client";
import Link from "next/link";
import React from "react";
import AuthModal from "./AuthModal";
import { useContext } from "react";
import { AuthenticationContext } from "../context/AuthContext";
import useAuth from "../../hooks/useAuth";

const NavBar = () => {
  const { data, loading, setAuthState } = useContext(AuthenticationContext);
  const { signOut } = useAuth();
  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link href="/" className="font-bold text-gray-700 text-2xl">
        OpenTable
      </Link>
      {loading ? null : (
        <div>
          {data ? (
            <button
              className="bg-[#247F9E] text-white border p-1 px-4 rounded mr-3"
              onClick={signOut}
            >
              Sign Out
            </button>
          ) : (
            <div className="flex">
              <AuthModal isSignin={true} />
              <AuthModal isSignin={false} />
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
