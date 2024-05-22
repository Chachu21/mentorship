import { Inter } from "next/font/google";
import React from "react";
import "../globals.css";
import ReduxProvider from "../Redux_Provider";
import AuthHeader from "@/components/auth/AuthHeader";
const inter = Inter({ subsets: ["latin"] });

const date = new Date();
const year = date.getFullYear();
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className}  container mx-auto max-w-[1336px] relative`}
      >
        <ReduxProvider>
          <AuthHeader />
          <main>{children}</main>
          <div className="md:container my-3 md:mx-auto max-w-[1336px] bg-gray-900  text-center text-white bottom-0 py-16">
            &copy; {year} Mentorship &reg; plc. all right are reserved.
          </div>
        </ReduxProvider>
      </body>
    </html>
  );
}
