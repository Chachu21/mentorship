import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Footer from "@/components/homePage/Footer";
import Redux_Provider from "../Redux_Provider";
import MentorNavBar from "@/components/MentorDashbord/MentorNavBar";
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
        className={`${inter.className} container mx-auto max-w-[1336px] relative`}
      >
        <Redux_Provider>
          <MentorNavBar />
          <main>{children}</main>
          <Footer />
        </Redux_Provider>
      </body>
    </html>
  );
}
