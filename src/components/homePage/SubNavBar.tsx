"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React from "react";
import { categories } from "@/components/constants/categories";

const SubNavBar = () => {
  const pathname = usePathname();

  return (
    <div className="py-5 bg-white hidden md:flex">
      <div className="flex space-x-3">
        {categories.map((category) => {
          const isActive =
            pathname === category.href.pathname

          return (
            <Link
              key={category.id}
              href={category.href.pathname}
              className={`hover:text-[#14A800] hover:underline ${
                isActive ? "text-cc underline font-bold" : "text-gray-500"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SubNavBar;
