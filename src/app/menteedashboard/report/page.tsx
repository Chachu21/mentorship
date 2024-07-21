"use client";
import UserTransaction from "@/components/payment/UserTransaction";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";

const ReportPage = () => {
  const user_id = useSelector((state: RootState) => state.users.user?._id);

  return (
    <div className="container flex flex-col space-y-5 mt-10">
      <h1 className="text-2xl font-semibold ml-5 mb-2">
        manage Your Transaction
      </h1>
      <UserTransaction
        urll={`http://localhost:5000/api/v1/payment/get/${user_id}`}
        user_id={`${user_id}`}
      />
    </div>
  );
};

export default ReportPage;
