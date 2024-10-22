"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { Menu, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { Settings, Power, Circle } from "lucide-react";
import {
  Profile,
  closeProfile,
  logoutSuccess,
} from "@/redux/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import axios from "axios";
import { IUser } from "@/type";
import { backend_url } from "../constant";

const MenteeNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [selectedOption, setSelectedOption] = useState("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [userdata, setUserdata] = useState<IUser>();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.users.user);
  const showCard = useSelector((state: RootState) => state.users.isClicked);
  const id = user?._id;
  useEffect(() => {
    // This code runs only on the client side
    setScreenWidth(window.innerWidth);

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/users/get/${id}`);
        // console.log(res.data);
        setUserdata(res.data.user);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, [id]);
  // const toggleDropdown = () => {
  //   setIsOpen(!isOpen);
  // };
  // const toggleMobileSearchInput = () => {
  //   setShowMobileSearch(!showMobileSearch);
  //   setIsOpenMobile(false);
  // };
  const toggleMobileMenu = () => {
    setIsOpenMobile(!isOpenMobile);
    setShowMobileSearch(false);
  };

  // const handleOptionClick = (option: string) => {
  //   setSelectedOption(option);
  //   setIsOpen(false);
  // };
  const handleLogout = () => {
    try {
      dispatch(logoutSuccess());
      router.push("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  const handleProfile = () => {
    dispatch(Profile());
  };
  const isOnline = true;
  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 max-w-[1336px] container mx-auto z-40">
      <nav className="flex justify-between items-center py-2 bg-white">
        <div className="flex justify-between items-center ">
          <div
            onClick={() => dispatch(closeProfile())}
            className="flex mr-5 items-center lg:space-x-0 space-x-3"
          >
            <div className="lg:hidden">
              <button
                className="flex justify-center items-center"
                onClick={toggleMobileMenu}
              >
                <Menu size={24} className={isOpenMobile ? "hidden" : "flex"} />
                <X size={24} className={isOpenMobile ? "flex" : "hidden"} />
              </button>
            </div>
            <Link href="/menteedashboard" className="font-pacifico">
              <h1 className="lg:text-2xl text-xl  text-[#14A800]">
                Mentorship
              </h1>
            </Link>
          </div>
          <div
            onClick={() => dispatch(closeProfile())}
            className={isOpenMobile ? "flex" : " hidden lg:flex"}
          >
            <ul className="flex container font-normal bg-white dark:bg-gray-900 dark:text-white absolute lg:relative flex-col lg:flex-row lg:space-x-5 w-full shadow lg:shadow-none text-center top-[45px] left-0 lg:top-0 lg:flex">
              <NavigationMenu className="z-50">
                <NavigationMenuList
                  className={`flex ${
                    screenWidth < 473 ? "flex-col md:flex-row" : "flex-row"
                  }`}
                >
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-[#14A800]">
                      Mentoring
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        onClick={toggleMobileMenu}
                        className="w-[150px] flex flex-col p-2 justify-start items-start"
                      >
                        <ListItem href="/menteedashboard/proposals">
                          Proposals
                        </ListItem>
                        <ListItem href="/menteedashboard/contracts">
                          All contracts
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link
                      href="/menteedashboard/mentor"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-[#14A800] ">
                          Find Mentor
                        </span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link
                      href="/menteedashboard/message"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-[#14A800] ">Message</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link
                      href="/menteedashboard/report"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-[#14A800] ">Report</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  {/* <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link
                      href="/menteedashboard/schedule"
                      legacyBehavior
                      passHref
                    >
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-[#14A800] ">Calender</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            </ul>
          </div>
        </div>
        <div className="flex items-center md:space-x-16 space-x-5">
          {/* {!isOpenMobile && (
            <button type="button" onClick={toggleMobileSearchInput}>
              <Search
                className="flex lg:hidden text-gray-700 items-center"
                color="gray"
                size={24}
              />
            </button>
          )}
          <div
            onClick={() => dispatch(closeProfile())}
            className={
              showMobileSearch
                ? "flex absolute top-[49px] w-full left-1/2 transform -translate-x-1/2 md:right-0 md:-translate-x-0 bg-white z-50"
                : " hidden lg:flex"
            }
          >
            <div className="flex relative items-center rounded-2xl border border-gray-200">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path
                    fill="currentColor"
                    d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l4.25 4.25a1 1 0 1 0 1.41-1.41L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-3 hover:bg-gray-200 h-10 lg:w-[280px] sm:w-[250px] w-[200px]  rounded-2xl outline-none"
                />
              </div>
              <div className="flex justify-center group items-center w-fit hover:bg-gray-200 h-10 rounded-2xl">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex justify-center group items-center px-5 w-fit hover:bg-gray-200 h-10 rounded-2xl outline-none"
                  >
                    {selectedOption || "Mentor"}
                    <svg
                      className="ml-2 h-8 w-5 fill-current text-gray-600 group-hover:text-gray-900"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M7 10l5 5 5-5z" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="absolute z-10 mt-1 w-[230px]  bg-white border border-gray-300 rounded-lg shadow-lg">
                      <ul>
                        <li
                          onClick={() => handleOptionClick("mentor")}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <span>Mentor</span>
                          <p className="text-sm text-gray-500">
                            get a mentor for guidance and consultation
                          </p>
                        </li>
                        <li
                          onClick={() => handleOptionClick("mentee")}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <span>Mentee</span>
                          <p className="text-sm text-gray-500">
                            look mentess profile
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div> */}
          <div className="relative">
            <div className="cursor-pointer" onClick={handleProfile}>
              <Image
                src={
                  userdata ? userdata.profileImage.url : "/assets/profile.jpeg"
                }
                alt="Profile"
                className="w-12 h-12 object-cover rounded-full"
                width={48}
                height={48}
              />
            </div>
            {showCard && (
              <Card className="absolute right-0 top-full mt-2 w-64 shadow-lg py-3">
                <div className="flex flex-col items-center space-y-2">
                  <Image
                    src={
                      userdata
                        ? userdata.profileImage.url
                        : "/assets/profile.jpeg"
                    }
                    alt={`User photo `}
                    className="w-16 h-16 object-cover rounded-full"
                    width={64}
                    height={64}
                  />
                </div>
                <CardContent className="flex flex-col items-center p-1 space-y-2">
                  <div className="px-4 text-center flex flex-col space-y-1">
                    <span className="capitalize"> {userdata?.fullName}</span>
                    <span className="capitalize">{userdata?.role}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle
                      className={`w-3 h-3 ${
                        isOnline ? "bg-green-500" : "text-gray-500"
                      }`}
                    />
                    <span>availbilty</span>
                  </div>

                  <div className="flex space-x-2" onClick={handleProfile}>
                    <Button
                      variant="outline"
                      onClick={() => router.push("/menteedashboard/settings")}
                    >
                      <Settings className="w-5 h-5" />
                      <span className="ml-1">Settings</span>
                    </Button>
                    <Button variant="outline" onClick={handleLogout}>
                      <Power className="w-5 h-5" />
                      <span className="ml-1">Logout</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </nav>

      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
    </header>
  );
};

export default MenteeNavBar;

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
