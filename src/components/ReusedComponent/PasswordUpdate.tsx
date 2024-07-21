"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Edit2, EyeIcon, EyeOffIcon } from "lucide-react";
import axios from "axios";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

interface PasswordProps {
  newPassword: string;
  oldPassword: string;
  confirmPassword: string;
}

const PasswordUpdate = () => {
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [password, setPassword] = useState<PasswordProps>({
    newPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const [showPasswordOld, setShowPasswordOld] = useState(false);
  const [showPasswordNew, setShowPasswordNew] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const token = useSelector((state: RootState) => state.users.user?.token);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setPassword((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.newPassword !== password.confirmPassword) {
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axios.put(
        `${backend_url}/api/v1/users/updatepassword`,
        {
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Corrected the token header
          },
        }
      );

      if (response.status === 200) {
        toast.success("Password updated successfully");
        setShowForm(false);
      } else {
        console.error("Failed to update password");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const togglePasswordOldVisibility = () => {
    setShowPasswordOld(!showPasswordOld);
  };

  const togglePasswordNewVisibility = () => {
    setShowPasswordNew(!showPasswordNew);
  };

  const togglePasswordConfirmVisibility = () => {
    setShowPasswordConfirm(!showPasswordConfirm);
  };

  return (
    <div className="md:p-8 space-y-4">
      <h2 className="text-xl font-semibold">Password and security</h2>
      <Card>
        <CardHeader>Authentication options</CardHeader>
        <CardContent className="flex justify-between">
          <div className="flex flex-col space-y-3">
            <h2>Password</h2>
            <div className="flex space-x-3">
              <CheckCircle className="text-cc" />
              <p>Password has been set</p>
            </div>
            <p className="text-gray-500">
              Choose a strong, unique password that&apos;s at least 8 characters
              long.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className="rounded-full p-3 text-cc cursor-pointer border border-gray-400"
              onClick={() => {
                setShowForm(true);
                setIsEditing(true);
              }}
            >
              <Edit2 />
            </div>
          </div>
        </CardContent>
      </Card>
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit password" : "Change password"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <div className="space-y-3 relative">
              <Label htmlFor="oldPassword">Old Password</Label>
              <div className="flex">
                <Input
                  type={showPasswordOld ? "text" : "password"}
                  id="oldPassword"
                  value={password.oldPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button" // Prevent form submission
                  className="flex justify-around items-center cursor-pointer"
                  onClick={togglePasswordOldVisibility}
                >
                  {showPasswordOld ? (
                    <EyeIcon className="absolute mr-10" size={25} />
                  ) : (
                    <EyeOffIcon className="absolute mr-10" size={25} />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-3 relative">
              <Label htmlFor="newPassword">New Password</Label>
              <div className="flex">
                <Input
                  type={showPasswordNew ? "text" : "password"}
                  id="newPassword"
                  value={password.newPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button" // Prevent form submission
                  className="flex justify-around items-center cursor-pointer"
                  onClick={togglePasswordNewVisibility}
                >
                  {showPasswordNew ? (
                    <EyeIcon className="absolute mr-10" size={25} />
                  ) : (
                    <EyeOffIcon className="absolute mr-10" size={25} />
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-3 relative">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="flex">
                <Input
                  type={showPasswordConfirm ? "text" : "password"}
                  id="confirmPassword"
                  value={password.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button" // Prevent form submission
                  className="flex justify-around items-center cursor-pointer"
                  onClick={togglePasswordConfirmVisibility}
                >
                  {showPasswordConfirm ? (
                    <EyeIcon className="absolute mr-10" size={25} />
                  ) : (
                    <EyeOffIcon className="absolute mr-10" size={25} />
                  )}
                </button>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PasswordUpdate;
