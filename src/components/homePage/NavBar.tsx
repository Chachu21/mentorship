"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import SubNavBar from "./SubNavBar";
import { Menu, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { IUser } from "@/type";
import { backend_url } from "../constant";
import axios from "axios";

const NavBar = () => {
  const [mentors, setMentors] = useState<IUser[]>([]);
  const [mentees, setMentees] = useState<IUser[]>([]);
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [screenWidth, setScreenWidth] = useState(0);
  const router = useRouter();

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
    const fetchMentors = async () => {
      const res = await axios.get(`${backend_url}/api/v1/users/getallmentors`);
      if (res.status === 200) {
        setMentors(res.data);
      }
    };
    fetchMentors();
  }, []);

  useEffect(() => {
    const fetchMentorsOrMentees = async () => {
      if (isSearching) {
        try {
          const res = await axios.get(
            `${backend_url}/api/v1/users/search/mentors`,
            {
              params: { query: searchQuery },
            }
          );
          setSearchResult(res.data);
        } catch (error) {
          console.error("Error fetching mentors:", error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    if (searchQuery !== "") {
      fetchMentorsOrMentees();
    } else {
      setSearchResult([]);
    }
  }, [isSearching, searchQuery]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileSearchInput = () => {
    setShowMobileSearch(!showMobileSearch);
    setIsOpenMobile(false);
  };

  const toggleMobileMenu = () => {
    setIsOpenMobile(!isOpenMobile);
    setShowMobileSearch(false);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state with input value
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearching(true);
      redirectToSearchResults();
      setSearchQuery("");
      setShowMobileSearch(false);
    }
  };

  const redirectToSearchResults = () => {
    if (selectedOption === "mentor") {
      router.push(`/mentors?search=${searchQuery}`);
    } else if (selectedOption === "mentee") {
      router.push(`/mentee?search=${searchQuery}`);
    }
  };

  return (
    <header className="fixed top-0 left-1/2 transform -translate-x-1/2 max-w-[1336px] container mx-auto z-40">
      <nav className="flex justify-between items-center py-2 bg-white">
        <div className="flex justify-between items-center ">
          <div className="flex mr-5 items-center lg:space-x-0 space-x-3">
            <div className="lg:hidden">
              <button
                className="flex justify-center items-center"
                onClick={toggleMobileMenu}
              >
                <Menu size={24} className={isOpenMobile ? "hidden" : "flex"} />
                <X size={24} className={isOpenMobile ? "flex" : "hidden"} />
              </button>
            </div>
            <Link href="/" className="font-pacifico">
              <h1 className="lg:text-2xl text-xl  text-cc">Mentorship</h1>
            </Link>
          </div>
          <div className={isOpenMobile ? "flex" : " hidden lg:flex"}>
            <ul
              className="flex container font-normal bg-white dark:bg-gray-900 dark:text-white absolute lg:relative flex-col lg:flex-row lg:space-x-5 w-full shadow lg:shadow-none text-center top-[45px] left-0 lg:top-0 lg:flex"
              // onClick={toggleMobileMenu}
            >
              <NavigationMenu className="z-50">
                <NavigationMenuList
                  className={`flex ${
                    screenWidth < 473 ? "flex-col md:flex-row" : "flex-row"
                  }`}
                >
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link href="/mentors" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-cc ">Find Mentors</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link href="/mentee" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-cc">Find Mentees</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link href="/why-mentorship" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-cc ">Why Mentorship</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </ul>
          </div>
        </div>
        <div className="flex items-center md:space-x-16 space-x-5">
          {!isOpenMobile && (
            <button type="button" onClick={toggleMobileSearchInput}>
              <Search
                className="flex lg:hidden text-gray-700 items-center"
                color="gray"
                size={24}
              />
            </button>
          )}
          <div
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
                  onChange={handleInputChange}
                  value={searchQuery}
                  onKeyDown={handleKeyDown}
                  type="text"
                  placeholder="Search"
                  className="pl-10 pr-3 hover:bg-gray-200 h-10 lg:w-[280px] sm:w-[250px] w-[200px]  rounded-2xl outline-none"
                />
              </div>
              <div className="flex justify-center group items-center w-fit hover:bg-gray-200 h-10 rounded-2xl">
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="flex justify-center capitalize group items-center px-5 w-fit hover:bg-gray-200 h-10 rounded-2xl outline-none"
                  >
                    {selectedOption || "mentor"}
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
                            Get a mentor for guidance and consultation
                          </p>
                        </li>
                        <li
                          onClick={() => handleOptionClick("mentee")}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          <span>Mentee</span>
                          <p className="text-sm text-gray-500">
                            Look for mentee&apos;s profiles
                          </p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 items-center">
            <div className={isOpenMobile ? "flex" : " hidden lg:flex"}>
              <Link href="/auth/login">Login</Link>
            </div>
            <div className={isOpenMobile ? " hidden lg:flex" : "flex"}>
              <Link href="/auth">
                <Button className="h-8 rounded-lg md:px-5 px-2 font-bold">
                  Sign up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <hr className="h-px bg-gray-200 border-0 dark:bg-gray-700" />
      <SubNavBar />
    </header>
  );
};

export default NavBar;
