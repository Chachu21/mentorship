"use client";
import { usePathname } from "next/navigation";
import React from "react";
import NavBar from "../../components/homePage/NavBar";
import Link from "next/link";

export const NavgationBar = () => {
  const router = usePathname();
  const isAuthRoute = router.startsWith("/auth");
  return (
    <>
      {isAuthRoute ? (
        <>
          <header>
            {" "}
            <Link href="/" className="font-pacifico">
              <h1 className="lg:text-2xl text-xl  text-[#14A800]">
                Mentorship
              </h1>
            </Link>
          </header>
        </>
      ) : (
        <NavBar />
      )}
    </>
  );
};
