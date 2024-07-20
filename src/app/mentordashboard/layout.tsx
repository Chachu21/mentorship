import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/homePage/Footer";
import Redux_Provider from "../Redux_Provider";
import MentorNavBar from "@/components/MentorDashbord/MentorNavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "manage account",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} container mx-auto max-w-screen-2xl relative`}
      >
        <Redux_Provider>
          <MentorNavBar />
          <main className="min-h-screen mt-16"> {children}</main>
          <ToastContainer />
          <Footer />
        </Redux_Provider>
      </body>
    </html>
  );
}
