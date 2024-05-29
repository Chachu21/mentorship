"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { logoutSuccess } from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { IUser } from "@/type";
import axios from "axios";
import { Edit2, Trash } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const user = useSelector((state: RootState) => state.users.user);
  const user_id = user?._id;

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/users/get/${user_id}`
      );
      setUserData(res.data.user);
    };
    fetchUserData();
  }, [user_id]);

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      // Send delete request to server
      try {
        await axios.delete(
          `http://localhost:5000/api/v1/users/delete/${user_id}`
        );
        // Dispatch action to logout user or handle as needed
        dispatch(logoutSuccess());
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  const handleEditModeToggle = () => {
    setIsEditMode(!isEditMode);
  };

  const handleFormSubmit = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/v1/users/update/${user_id}`,
        userData
      );
      const updatedUserDatas = res.data.user;
      // Update local state with updated data after successful update
      setIsEditMode(false); // Exit edit mode
      setUserData(updatedUserDatas);
      setIsEditMode(false); // Exit edit mode
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState!,
      [id]: value,
    }));
  };

  return (
    <div>
      <Card>
        <CardContent>
          <div className="flex justify-between items-center">
            <h2>Account</h2>
            {isEditMode ? (
              <div className="flex space-x-2 py-2">
                <Button onClick={handleFormSubmit} className="px-3">
                  Update
                </Button>
                <Button variant={"outline"} onClick={handleEditModeToggle}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <div
                  className="rounded-full p-3 text-cc cursor-pointer border border-gray-400"
                  onClick={handleEditModeToggle}
                >
                  <Edit2 />
                </div>
              </div>
            )}
          </div>
          {isEditMode ? (
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-5 py-5">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    value={userData?.fullName}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={userData?.email}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={userData?.phoneNumber}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col space-y-5 py-5">
              <div className="flex flex-col space-y-2">
                <span>Full Name</span>
                <p className="text-gray-500">{userData?.fullName}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <span>Email</span>
                <p className="text-gray-500">{userData?.email}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <span>Phone Number</span>
                <p className="text-gray-500">{userData?.phoneNumber}</p>
              </div>
              <button
                className="flex justify-start text-red-500 cursor-pointer "
                onClick={handleDeleteAccount}
              >
                Close account
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Contact;
