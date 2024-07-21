"use client";
import { useDispatch, useSelector } from "react-redux";
import {
  CurrencyIcon,
  LayoutDashboardIcon,
  User2,
  UserCircle2,
  X,
} from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { menuBar } from "@/redux/features/userSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
    id: 4,
    name: "Manage mentors",
    path: "/admin/managementors",
    icon: <UserCircle2 className="mr-3 text-xl" />,
  },
  {
    id: 5,
    name: "Transactions",
    path: "/admin/transactions",
    icon: <CurrencyIcon className="mr-3 text-xl" />,
  },
];

const AdminSideBar = () => {
  const isClicked = useSelector((state: RootState) => state.users.isMenu);
  const dispatch = useDispatch<AppDispatch>();
  const pathname = usePathname();

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
      }`}
    >
      <div className="flex justify-between items-center">
        <Link
          href="/admin"
          className="items-center pb-4 border-b border-b-gray-800"
        >
          <h2 className="font-bold text-2xl">
            Mentoring{" "}
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

        {LinkComponent.map((links) => {
          const isActive = pathname === links.path;
          return (
            <li
              key={links.id}
              className="mb-1 group"
              onClick={handleCloseSideBar}
            >
              <Link
                href={links.path}
                className={`flex font-semibold items-center py-2 px-4 ${
                  isActive
                    ? "text-cc bg-gray-50"
                    : "text-gray-900 hover:bg-gray-950 hover:text-gray-100"
                } rounded-md`}
              >
                {links.icon}
                <span className="text-sm">{links.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default AdminSideBar;
