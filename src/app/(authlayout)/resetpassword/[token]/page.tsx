"use client";
import { useState, FormEvent } from "react";
import { useRouter, useParams } from "next/navigation"; // Import useRouter
import axios from "axios";
import { backend_url } from "@/components/constant";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();
  const { token } = useParams(); // Extract the token from the URL

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage("Invalid token");
      return;
    }

    try {
      const response = await axios.post<{ message: string }>(
        `${backend_url}/api/v1/users/resetPassword/${token}`,
        {
          password,
        }
      );
      setMessage(response.data.message);
      if (response.status === 200) {
        // Clear password
        setPassword("");
        // Navigate to login
        toast.success(response.data.message);
        router.push("/auth/login");
      }
    } catch (error) {
      setMessage("An error occurred while resetting password");
      console.error("Error resetting password:", error);
    }
  };

  return (
    <section className="flex justify-center h-full">
      <div className=" w-full md:max-w-lg  mx-auto  items-center space-y-6 flex flex-col justify-center shadow-sm">
        <h2 className="text-2xl mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="block mb-1">New Password:</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <Button
            type="submit"
            className="w-full py-2 px-4  text-white rounded"
          >
            Reset Password
          </Button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </section>
  );
};

export default ResetPassword;
