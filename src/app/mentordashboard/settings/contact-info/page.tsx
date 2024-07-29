"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { logoutSuccess } from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { IUser } from "@/type";
import axios from "axios";
import { Edit2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModelForDelete from "@/components/ReusedComponent/ModelForDelete"; // Adjust the import path as needed
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { backend_url } from "@/components/constant";

const Contact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [isContactEditMode, setIsContactEditMode] = useState(false);
  const [isAddressEditMode, setIsAddressEditMode] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const user = useSelector((state: RootState) => state.users.data);
  const data = useSelector((state: RootState) => state.users.user);
  const user_id = data?._id;
  const id = user?._id ? user?._id : user_id;
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(`${backend_url}/api/v1/users/get/${id}`);
      setUserData(res.data.user);
    };
    fetchUserData();
  }, [id]);

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${backend_url}/api/v1/users/delete/${user_id}`);
      dispatch(logoutSuccess());
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleContactEditModeToggle = () => {
    setIsContactEditMode(!isContactEditMode);
  };

  const handleAddressEditModeToggle = () => {
    setIsAddressEditMode(!isAddressEditMode); // Toggle the state
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(userData);
    try {
      const res = await axios.put(`${backend_url}/api/v1/users/update/${id}`, {
        updates: userData,
      });
      const updatedUserData = res.data.user;
      setUserData(updatedUserData);
      isContactEditMode && setIsContactEditMode(false);
      isAddressEditMode && setIsAddressEditMode(false);
      // Exit edit mode
      window.location.reload();
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData((prevState) => ({
      ...prevState!,
      location: {
        ...prevState!.location!,
        [id]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col space-y-4 md:px-8">
      <Card>
        <CardContent>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Account</h2>
              {isContactEditMode ? (
                <div className="flex space-x-8 md:py-2 pt-20">
                  <Button onClick={handleFormSubmit} className="px-3">
                    Update
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={handleContactEditModeToggle}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-full p-3 text-cc cursor-pointer border border-gray-400"
                    onClick={handleContactEditModeToggle}
                  >
                    <Edit2 />
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          {isContactEditMode ? (
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-5 py-5">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    type="text"
                    id="fullName"
                    value={userData?.fullName || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    value={userData?.email || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    value={userData?.phoneNumber || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col space-y-5">
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
                onClick={() => setIsDialogOpen(true)}
              >
                Close account
              </button>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Address Info</h2>
              </div>
              {isAddressEditMode ? (
                <div className="flex space-x-8 md:py-2 pt-20">
                  <Button onClick={handleFormSubmit} className="px-3">
                    Update
                  </Button>
                  <Button
                    variant={"outline"}
                    onClick={handleAddressEditModeToggle}
                  >
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div
                    className="rounded-full p-3 text-cc cursor-pointer border border-gray-400"
                    onClick={handleAddressEditModeToggle}
                  >
                    <Edit2 />
                  </div>
                </div>
              )}
            </div>
          </CardHeader>
          {isAddressEditMode ? (
            <form onSubmit={handleFormSubmit}>
              <div className="flex flex-col space-y-5">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="state">Country</Label>
                  <Input
                    type="text"
                    id="state"
                    value={userData?.location?.state || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="region">Region</label>
                  <Input
                    type="text"
                    id="region"
                    value={userData?.location?.region || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label htmlFor="city">City</label>
                  <Input
                    type="text"
                    id="city"
                    value={userData?.location?.city || ""}
                    onChange={handleInputChange}
                    className="text-gray-500 border border-gray-300 rounded-md p-2"
                  />
                </div>
              </div>
            </form>
          ) : (
            <div className="flex flex-col space-y-5">
              <div className="flex flex-col space-y-2">
                <span>Country</span>
                <p className="text-gray-500">{userData?.location?.state}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <span>Region</span>
                <p className="text-gray-500">{userData?.location?.region}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <span>City</span>
                <p className="text-gray-500">{userData?.location?.city}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <ModelForDelete
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onDelete={handleDeleteAccount}
        title="Confirm Account Deletion"
        description="Are you sure you want to delete your account? This action cannot be undone."
      />
    </div>
  );
};

export default Contact;
