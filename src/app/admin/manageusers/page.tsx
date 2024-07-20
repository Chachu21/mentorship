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
  const [tableData, setTableData] = useState<IUser[]>([]);
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
      console.log(response);
      setTableData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Extract only necessary fields from tableData
  const filteredData = tableData.map(
    ({ _id, fullName, email, phoneNumber, location, role }) => ({
      _id,
      fullName,
      email,
      phoneNumber,
      role,
      address: location?.region,
      city: location?.city,
    })
  );

  const handleSearch = (searchTerm: string) => {
    const filteredResults = filteredData.filter((data) =>
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

      const response = await axios.get(
        `${backend_url}/api/v1/users/get/by/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const groupsData = response.data.group;
      if (groupsData && groupsData.status === "stated") {
        toast.warning("you can not delete a user");
      } else if (response.status === 404) {
        toast.warning("this action allowed for admin");
      } else {
        await axios.delete(
          `${backend_url}api/v1/users/delete/${userId}`,
          config
        );
        setTableData(tableData.filter((user) => user._id !== userId));
        setFilteredUser(filteredUser.filter((user) => user._id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const tableHead = [
    { id: "1", title: "ID" },
    { id: "2", title: "Name" },
    { id: "3", title: "Email" },
    { id: "4", title: "PHONE" },
    { id: "5", title: "Role" },
    { id: "6", title: "Address" },
    { id: "7", title: "City" },
  ];

  return (
    <div className="container mt-5">
      <h1 className="text-2xl font-semibold ml-5 mb-2">Manage users</h1>
      <div className="my-5">
        <SearchUi handleSearch={handleSearch} search="fullName" />{" "}
      </div>
      <Tables
        header={tableHead}
        datas={filteredUser.length > 0 ? filteredUser : filteredData}
        onDelete={handleDelete}
        hasDelete={true}
      />
    </div>
  );
};

export default UserManage;
