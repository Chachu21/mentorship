"use client";
import React from "react";
import AdminHeader from "./AdminHeader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface manPartProps {
  children: React.ReactNode;
}

const MainPart = ({ children }: manPartProps) => {
  const isMenu = useSelector((state: RootState) => state.users.isMenu);

  return (
    <div
      className={`w-full relative flex flex-col flex-1 bg-gray-200 min-h-screen transition-all ${
        isMenu ? "md:ml-0" : "md:w-[calc(100%-256px)]  md:ml-64"
      }`}
    >
      <AdminHeader />
      {children}
    </div>
  );
};

export default MainPart;
