import React from "react";
import DetailPageOfMentor from "../Mentor/MentorsList";

const MainPart = () => {
  return (
    <div className="flex flex-col space-y-5">
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
          placeholder="Try web development  and IT or  social and business"
          className="pl-10 pr-3 bg-gray-200 h-10 lg:w-[450px] sm:w-[250px] w-full  rounded-2xl outline-none"
        />
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-semibold">Expertises categories</h1>
        <div className="flex">
          <div className="md:w-[14%] md:flex hidden flex-col space-y-4">
            <div className="flex space-x-3 items-center">
              <input type="radio" />
              <span>All Catagories</span>
            </div>
            <div className="flex space-x-3 items-center">
              <input type="radio" />
              <span>Development and it</span>
            </div>
            <div className="flex space-x-3 items-center">
              <input type="radio" />
              <span>Markating and sales</span>
            </div>
            <div className="flex space-x-3 items-center">
              <input type="radio" />
              <span>Social and business</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col space-y-5">
            <DetailPageOfMentor url="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPart;
