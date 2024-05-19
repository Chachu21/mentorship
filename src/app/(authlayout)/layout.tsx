"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import React, { ReactNode } from "react";
import "../globals.css";
import { usePathname } from "next/navigation";
const inter = Inter({ subsets: ["latin"] });

const date = new Date();
const year = date.getFullYear();
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <html lang="en">
      <body
        className={`${inter.className}  container mx-auto max-w-[1336px] relative`}
      >
        <header className="max-w-[1336px] container mx-auto z-50 bg-white py-2 fixed top-0 left-1/2 transform -translate-x-1/2 ">
          <div className="flex justify-between items-center">
            <Link href="/" className="font-pacifico">
              <h1 className="lg:text-2xl text-xl  text-[#14A800]">
                Mentorship
              </h1>
            </Link>
            {pathname === "/auth/signup" && (
              <div className="flex items-center space-x-3 text-sm">
                <Link href="/">Find Mentor</Link>
                <Link href="/" className="text-[#14A800]">
                  Apply as Mentor
                </Link>
              </div>
            )}
          </div>
        </header>
        <main>{children}</main>
        <div className="container my-3 mx-auto max-w-[1336px] bg-gray-900  text-center text-white bottom-0 py-16">
          &copy; {year} Mentorship &reg; plc. all right are reserved.
        </div>
      </body>
    </html>
  );
}
