"use client";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const AuthHeader = () => {
  const pathname = usePathname();
  const role = useSelector((state: RootState) => state.users.roleBeforLogin);
  return (
    <header className="max-w-[1336px] container mx-auto z-50 bg-white py-2 fixed top-0 left-1/2 transform -translate-x-1/2 ">
      <div className="flex justify-between items-center">
        <Link href="/" className="font-pacifico">
          <h1 className="lg:text-2xl text-xl  text-[#14A800]">Mentorship</h1>
        </Link>
        <div className="hidden md:flex">
          {pathname === "/auth/signup" && (
            <div>
              {role === "mentor" && (
                <div className="flex items-center space-x-3 text-sm">
                  <Link href="/">Find Mentor?</Link>
                  <Link
                    href="/auth/signup?role=mentee"
                    className="text-[#14A800]"
                  >
                    Apply as Mentee
                  </Link>
                </div>
              )}
              {role === "mentee" && (
                <div className="flex items-center space-x-3 text-sm">
                  <p>Find Mentee?</p>
                  <Link
                    href="/auth/signup?role=mentor"
                    className="text-[#14A800]"
                  >
                    Apply as Mentor
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex md:hidden">
          {pathname === "/auth/signup" && (
            <Link href="/auth/login">Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default AuthHeader;
