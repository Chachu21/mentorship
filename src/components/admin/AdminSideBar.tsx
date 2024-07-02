"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  CurrencyIcon,
  GroupIcon,
  LayoutDashboardIcon,
  LucideCurrency,
  MessageCircle,
  User,
  User2,
  X,
} from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { menuBar } from "@/redux/features/userSlice";
import Link from "next/link";

const LinkComponent = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin",
    icon: <LayoutDashboardIcon className="mr-3 text-xl" />,
  },

  {
    id: 2,
    name: "Manage Users",
    path: "/admin/manageusers",
    icon: <User2 className="mr-3 text-xl" />,
  },
  {
    id: 3,
    name: "Manage Payment",
    path: "/admin/managepayment",
    icon: <User className="mr-3 text-xl" />,
  },
  {
    id: 4,
    name: "Manage mentors",
    path: "/admin/managementors",
    icon: <GroupIcon className="mr-3 text-xl" />,
  },

  {
    id: 5,
    name: "Transactions",
    path: "/admin/transactions",
    icon: <CurrencyIcon className="mr-3 text-xl" />,
  },
];

const AdminSideBar = () => {
  // const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unseenCount, setUnseenCount] = useState<number>(0);
  const [fetchTrigger, setFetchTrigger] = useState(true); // State variable to trigger the effect

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/notification/get"
        );
        // setNotifications(response.data.notifications);
        setUnseenCount(response.data.unreadCount);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    // Execute fetchNotifications initially and then every 1 minute (60000 milliseconds)
    fetchNotifications();
    const intervalId = setInterval(() => {
      setFetchTrigger((prev) => !prev); // Toggle the state to trigger the effect
    }, 1000);

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [fetchTrigger]); // Add fetchTrigger as a dependency

  const isClicked = useSelector((state: RootState) => state.users.isMenu);
  const dispatch = useDispatch<AppDispatch>();

  const screenWidth = window.innerWidth;

  const handleCloseSideBar = () => {
    if (screenWidth < 640) {
      dispatch(menuBar());
    }
  };

  return (
    <aside
      className={`fixed left-0 top-0 w-64 h-full bg-[#f8f4f3] p-4 z-50 transform ${
        isClicked ? "-translate-x-full" : "translate-x-0"
      } `}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/admin"
          className="items-center pb-4 border-b border-b-gray-800"
        >
          <h2 className="font-bold text-2xl">
            Mentoring
            <span className="bg-[#008B8B] text-white px-2 rounded-md">
              Admin
            </span>
          </h2>
        </Link>
        <button
          type="button"
          onClick={() => dispatch(menuBar())}
          className="md:hidden block w-fit bg-white p-1 text-gray-900 text-2xl font-semibold"
        >
          <X />
        </button>
      </div>

      <ul className="mt-4 space-y-5">
        <span className="text-gray-400 font-bold">Manage The System</span>

        {LinkComponent.map((links) => (
          <li
            key={links.id}
            className="mb-1 group"
            onClick={handleCloseSideBar}
          >
            <Link
              href={links.path}
              className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
            >
              {links.icon}
              <span className="text-sm">{links.name}</span>
            </Link>
          </li>
        ))}
        <li onClick={handleCloseSideBar} className="mb-1 group">
          <Link
            href="/admin/message"
            className="flex font-semibold items-center py-2 px-4 text-gray-900 hover:bg-gray-950 hover:text-gray-100 rounded-md group-[.active]:bg-gray-800 group-[.active]:text-white group-[.selected]:bg-gray-950 group-[.selected]:text-gray-100"
          >
            <MessageCircle className="mr-3 text-xl" />
            <span className="text-sm">Notifications</span>
            <span className=" md:block px-2 py-0.5 ml-auto text-xs font-medium tracking-wide text-green-600 bg-green-200 rounded-full">
              {unseenCount} news
            </span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default AdminSideBar;
