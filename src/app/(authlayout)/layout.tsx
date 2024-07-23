import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import "../globals.css";
import ReduxProvider from "../Redux_Provider";
import AuthHeader from "@/components/auth/AuthHeader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

const date = new Date();
const year = date.getFullYear();

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${inter.className} h-full flex flex-col  container mx-auto max-w-[1336px]`}
      >
        <ReduxProvider>
          <AuthHeader />
          <Suspense fallback={<Loading />}>
            <main className="flex-grow  container mx-auto max-w-[1336px]">
              {children}
            </main>
          </Suspense>
          <ToastContainer />
          <footer className="bg-gray-900  container mx-auto max-w-[1336px] text-center text-white py-16">
            <div className="">
              &copy; {year} Mentorship &reg; plc. all rights reserved.
            </div>
          </footer>
        </ReduxProvider>
      </body>
    </html>
  );
}
