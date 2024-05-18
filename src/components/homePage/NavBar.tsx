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
// import Image from "next/image";
import { Button } from "../ui/button";
import SubNavBar from "./SubNavBar";
import { Menu, Search, X } from "lucide-react";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);

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
              <h1 className="lg:text-2xl text-xl  text-[#14A800]">
                Mentorship
              </h1>
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
                    screenWidth < 473 ? "flex-col" : "flex-row"
                  }`}
                >
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-[#14A800]">
                      Find Mentor
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        onClick={toggleMobileMenu}
                        className="grid gap-3 p-6 w-full md:w-[500px] lg:w-[600px] lg:grid-cols-[.75fr_1fr]"
                      >
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <a
                              className="flex h-full w-full select-none flex-col justify-end rounded-lg bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-lg"
                              href="/"
                            >
                              {/* <Icons.logo className="h-6 w-6" /> */}
                              <div className="mb-2 mt-4 text-lg font-medium">
                                shadcn/ui
                              </div>
                              <p className="text-sm leading-tight text-muted-foreground">
                                Beautifully designed components that you can
                                copy and paste into your apps. Accessible.
                                Customizable. Open Source.
                              </p>
                            </a>
                          </NavigationMenuLink>
                        </li>
                        <ListItem href="/docs" title="Introduction">
                          Re-usable components built using Radix UI and Tailwind
                          CSS.
                        </ListItem>
                        <ListItem
                          href="/docs/installation"
                          title="Installation"
                        >
                          How to install dependencies and structure your app.
                        </ListItem>
                        <ListItem
                          href="/docs/primitives/typography"
                          title="Typography"
                        >
                          Styles for headings, paragraphs, lists...etc
                        </ListItem>
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="hover:text-[#14A800]">
                      Find Mentee
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul
                        onClick={toggleMobileMenu}
                        className="grid w-[375px] gap-3 p-4 md:w-[500px] lg:grid-cols-2 lg:w-[600px] "
                      >
                        {components.map((component) => (
                          <ListItem
                            key={component.title}
                            title={component.title}
                            href={component.href}
                            className="hover:text-[#14A800]"
                          >
                            {component.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                  <NavigationMenuItem onClick={toggleMobileMenu}>
                    <Link href="/docs" legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        <span className="hover:text-[#14A800] ">
                          Why Mentorship
                        </span>
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
          </div>
          <div className="flex space-x-3 items-center">
            <div className={isOpenMobile ? "flex" : " hidden lg:flex"}>
              <Link href="/login">Login</Link>
            </div>
            <div className={isOpenMobile ? " hidden lg:flex" : "flex"}>
              <Link href="/signup">
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
