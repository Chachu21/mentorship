"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { IUser } from "@/type";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import Tables from "@/components/tables/Tables";
import SearchUi from "@/components/tables/SearchUi";
import { backend_url } from "@/components/constant";

interface UserDataType {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: string;
  _id: string;
  city?: string;
  address?: string;
}

const UserManage = () => {
  const [tableData, setTableData] = useState<UserDataType[]>([]);
  const [filteredUser, setFilteredUser] = useState<UserDataType[]>([]);
  const userData = useSelector((state: RootState) => state.users.user);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get<IUser[]>(
        `${backend_url}/api/v1/users/get`
      );
      console.log("Data fetched:", response.data);

      // Map response data to UserDataType format
      const users = response.data.map((user) => ({
        _id: user.id,
        fullName: user.name,
        email: user.email || "N/A",
        phoneNumber: user.phoneNumber || "N/A",
        role: user.role || "N/A",
        address: user.address || "N/A",
        city: user.city || "N/A",
      }));

      setTableData(users);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleSearch = (searchTerm: string) => {
    const filteredResults = tableData.filter((data) =>
      data.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUser(filteredResults);
  };
const handleDelete = async (userId: string) => {
  try {
    const token = userData?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    // Ensure the DELETE request is made to the correct endpoint
    await axios.delete(`${backend_url}/api/v1/users/delete/${userId}`, config);

    // Update state after successful deletion
    setTableData(tableData.filter((user) => user._id !== userId));
    setFilteredUser(filteredUser.filter((user) => user._id !== userId));
    toast.success("User deleted successfully");
  } catch (error) {
    console.error("Error deleting user:", error);
    toast.error("Failed to delete user");
  }
};
  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Name" },
    { id: "3", title: "Email" },
    { id: "4", title: "Phone" },
    { id: "5", title: "Role" },
    { id: "6", title: "Address" },
    { id: "7", title: "City" },
    
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage Users</h1>
      <div className="my-5">
        <SearchUi handleSearch={handleSearch} search="fullName" />
      </div>
      <Tables
        header={tableHead}
        datas={filteredUser.length > 0 ? filteredUser : tableData}
        onDelete={handleDelete}
        hasDelete={true} // Ensure this prop is used correctly in Tables component
      />
    </div>
  );
};

export default UserManage;
