"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { backend_url } from "@/components/constant";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");
  const router = useRouter();
  const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_url}/api/v1/users/forgotpassword`,
        {
          email: email, // Pass values.email
        }
      );
      // console.log(response.data);

      if (response) {
        // Password reset email sent successfully
        // You can display a success message to the user or redirect them to another page
        console.log("Password reset email sent successfully");
        setEmail("");
        router.push("/");
      } else {
        // Handle error
        console.error("Failed to send password reset email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden mt-16 justify-center">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-semibold mb-6 text-gray-600 text-center">
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPassword}>
          <div className="mb-4">
            <Label
              htmlFor="email"
              className="text-gray-500 text-sm font-bold mb-2"
            >
              Email
            </Label>
            <Input
              type="email"
              placeholder="enter your email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <Button
            type="submit"
            className="w-full  text-white p-3 rounded-lg font-semibold mb-4"
          >
            Submit
          </Button>
        </form>
      </div>
      <div className="bg-gray-100 text-center py-4">
        <p className="text-gray-600">
          Remembered your password?{" "}
          <Link href={"/auth/login"} className="text-cc font-semibold">
            Login now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
