import Link from "next/link";
import React from "react";

const SubNavBar = () => {
  const links = [
    {
      id: 1,
      name: "Development & IT",
      href: "#",
    },
    {
      id: 2,
      name: "Design & Creativity Art",
      href: "#",
    },
    {
      id: 3,
      name: "Health & Fitness",
      href: "#",
    },
    {
      id: 4,
      name: "Lifestyle",
      href: "#",
    },
    {
      id: 5,
      name: "Social & Business",
      href: "#",
    },
    {
      id: 6,
      name: "Markating & finances",
      href: "#",
    },
  ];
  return (
    <div className="fixed top-16 left-0 inset-0 max-w-[1336px] container mx-auto z-50 py-4">
      <div className="flex space-x-3">
        {links.map((link) => (
          <Link
            href={link.href}
            key={link.id}
            className="text-gray-600 hover:text-[#14A800] hover:underline"
          >
            {link.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SubNavBar;
