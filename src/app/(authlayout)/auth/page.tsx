"use client";
import { Button } from "@/components/ui/button";
import { setRoleBeforeLogin } from "@/redux/features/userSlice";
import { AppDispatch } from "@/redux/store";
import { User } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const [selectedRole, setSelectedRole] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    dispatch(setRoleBeforeLogin(role));
  };

  return (
    <div className="mt-16 md:mt-32 h-full flex justify-center space-y-5 items-center flex-col mb-10">
      <div className="text-3xl">Join as a mentee or mentor</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div
          className={`w-full md:w-72 bg-white border rounded-md flex space-y-3 flex-col py-5 pl-3 md:pl-8 transition-colors ${
            selectedRole === "mentee"
              ? "border-[#14A800] bg-gray-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex justify-end items-end pr-3">
            <input
              type="radio"
              name="role"
              id="mentee"
              className="input-radio"
              onChange={() => handleRoleChange("mentee")}
              checked={selectedRole === "mentee"}
            />
          </div>
          <User />
          <span className="text-lg">
            I&apos;m a mentee, looking mentor for mentorship
          </span>
        </div>
        <div
          className={`w-full md:w-72 bg-white border rounded-md flex space-y-3 flex-col py-5 pl-3 md:pl-8 transition-colors ${
            selectedRole === "mentor"
              ? "border-[#14A800] bg-gray-50"
              : "border-gray-300"
          }`}
        >
          <div className="flex justify-end items-end pr-3">
            <input
              type="radio"
              name="role"
              id="mentor"
              className="input-radio"
              onChange={() => handleRoleChange("mentor")}
              checked={selectedRole === "mentor"}
            />
          </div>
          <User />
          <span className="text-lg">
            I&apos;m a mentor, looking mentee for mentorship
          </span>
        </div>
      </div>

      <div>
        <Link
          href={{
            pathname: "/auth/signup",
            query: { role: selectedRole },
          }}
          as={`/auth/signup?role=${selectedRole}`}
        >
          <Button
            className={`rounded-lg text-lg mt-10 ${
              !selectedRole ? "bg-gray-200 text-gray-900 text-sm" : ""
            }`}
            disabled={!selectedRole}
          >
            {!selectedRole
              ? "Create Account"
              : selectedRole === "mentor"
              ? "Apply as a Mentor"
              : "Join as a Mentee"}
          </Button>
        </Link>
      </div>
      <div>
        <p>
          Already have an account?{" "}
          <Link href="/auth/login" className="text-[#14A800] underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
