"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import profile from "../../../public/assets/profile.jpeg";
import { toast } from "react-toastify";
import { MenuIcon } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { IUser } from "@/type";
import { useRouter } from "next/navigation";
import { logoutSuccess, menuBar } from "@/redux/features/userSlice";
import Link from "next/link";
import Image from "next/image";

const AdminHeader = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [Profile, setProfile] = useState(false);
  const [Users, setUser] = useState<IUser>();
  const navigate = useRouter();
  const user = useSelector((state: RootState) => state.users.user);
  const id = user?._id;
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/users/get/${id}`
        );
        setUser(response.data.user);
      } catch (error) {
        const axiosError = error as AxiosError<{ error: string }>;
        if (axiosError) {
          if (axiosError.code === "ERR_NETWORK") {
            toast.error("your interent is not stable");
          }
        }
      }
    };
    fetchUserProfile();
  }, [id]);

  const logoutHandler = async () => {
    try {
      dispatch(logoutSuccess());
      navigate.push("/");
    } catch (error) {
      // console.log(error);
    }
  };

  return (
    <div className="py-2 px-6 bg-[#f8f4f3] flex items-center shadow-md shadow-black/5 sticky top-0 left-0 z-30">
      <div className="flex justify-between items-center w-full">
        <div className="flex space-x-10 items-center">
          <button
            onClick={() => {
              dispatch(menuBar());
            }}
            type="button"
            className="text-lg text-gray-900 font-semibold "
          >
            <MenuIcon />
          </button>
        </div>
        <ul>
          <li className="ml-3">
            <button
              onClick={() => {
                setProfile(!Profile);
              }}
              type="button"
              className="flex items-center"
            >
              <div className="flex-shrink-0 w-10 h-10 relative">
                <div className="p-1 bg-white rounded-full focus:outline-none focus:ring">
                  <Image
                    className="w-8 h-8 rounded-full"
                    src={Users?.profileImage ? Users.profileImage.url : profile}
                    alt="profile"
                    width={40}
                    height={40}
                  />
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-400 border-2 border-white rounded-full animate-ping"></div>
                  <div className="top-0 left-7 absolute w-3 h-3 bg-lime-500 border-2 border-white rounded-full"></div>
                </div>
              </div>
              <div className="p-2 md:block text-left">
                <h2 className="text-sm font-semibold text-gray-800">
                  {Users?.fullName.split(" ")[0]}
                </h2>
                <p className="text-xs text-gray-500 capitalize">
                  {Users?.role}
                </p>
              </div>
            </button>
            <ul
              className={`shadow-md shadow-black/5 z-30 ${
                Profile
                  ? "flex flex-col fixed top-[70px] right-[10px] space-y-2"
                  : "hidden"
              } py-1.5 rounded-md bg-white border border-gray-100 w-full max-w-[140px]`}
            >
              <li>
                <Link
                  onClick={() => {
                    setProfile(!Profile);
                  }}
                  href="/admin/profile"
                  className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-gray-500 hover:bg-gray-50"
                >
                  Profile
                </Link>
              </li>
              <li>
                <form method="POST" action="" onClick={logoutHandler}>
                  <Link
                    onClick={() => {
                      setProfile(!Profile);
                    }}
                    href="/"
                    role="menuitem"
                    className="flex items-center text-[13px] py-1.5 px-4 text-gray-600 hover:text-[#f84525] hover:bg-gray-50 cursor-pointer"
                  >
                    Log Out
                  </Link>
                </form>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHeader;
