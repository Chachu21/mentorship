import { Inter } from "next/font/google";
import React, { Suspense } from "react";
import "../globals.css";
import ReduxProvider from "../Redux_Provider";
import AuthHeader from "@/components/auth/AuthHeader";
import ReactQueryProvider from "../ReactQueryProvider";
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
    <html lang="en">
      <body
        className={`${inter.className}  container mx-auto max-w-[1336px] relative`}
      >
        <ReactQueryProvider>
          <ReduxProvider>
            <AuthHeader />
            <Suspense fallback={<Loading />}>
              <main>{children}</main>
            </Suspense>
            <ToastContainer />
            <div className="md:container my-3 md:mx-auto max-w-[1336px] bg-gray-900  text-center text-white bottom-0 py-16">
              &copy; {year} Mentorship &reg; plc. all right are reserved.
            </div>
          </ReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
