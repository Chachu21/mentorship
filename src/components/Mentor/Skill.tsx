import React from "react";
import { Button } from "../ui/button";
import { Star, StarIcon, StarOff, StarOffIcon } from "lucide-react";

const Skill = () => {
  return (
    <div className="flex flex-col space-y-10">
      <h1 className="text-3xl  font-bold text-[#14A800] dark:text-white md:text-4xl leading-8">
        Connect with top-notch PHP mentors for guidance and mentorship.
      </h1>
      <p className="mt-3 text-[18px] font-medium text-gray-800 dark:text-gray-400">
        Explore PHP mentors with the skills tailored to your mentorship needs.
      </p>
      <Button className="px-3 w-fit text-lg">
        Engage mentors for mentorship
      </Button>
      <div className="py-4 rounded-md text-lg flex space-x-1 text-center bg-gray-50 border md:container ">
        Mentees rate PHP developers
        <span className="p-1 text-center">
          <Star color="#14A800" />
        </span>
        <span className="p-1 text-center">
          <Star color="#14A800" />
        </span>
        <span className="p-1 text-center">
          <Star color="#14A800" />
        </span>
        <span className="p-1 text-center">
          <Star color="#14A800" />
        </span>
        <span className="p-1 text-center">
          <Star color="#14A800" />
        </span>
        4.8/5 based on 74,803 client reviews
      </div>
    </div>
  );
};

export default Skill;
