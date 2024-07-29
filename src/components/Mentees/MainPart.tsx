"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "@/type";
import axios from "axios";
import { backend_url } from "../constant";
import { Input } from "../ui/input";
import DetailPageOfMentee from "./DetailPageOfMentee";

const MainPart = () => {
  const [mentees, setMentees] = useState<IUser[]>([]);
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    const fetchMentee = async () => {
      const res = await axios.get(`${backend_url}/api/v1/users/getAllMentees`);
      if (res.status === 200) {
        setMentees(res.data);
      }
    };
    fetchMentee();
  }, []);

  useEffect(() => {
    const fetchMentees = async () => {
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
      fetchMentees();
    } else {
      setSearchResult([]);
    }
  }, [isSearching, searchQuery]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state with input value
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearching(true);
    }
  };
  return (
    <div className="flex flex-col space-y-5">
      <div className="relative">
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path
            fill="currentColor"
            d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l4.25 4.25a1 1 0 1 0 1.41-1.41L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <Input
          type="text"
          placeholder="Search Mentees"
          className="pl-10 pr-3 border border-gray-300 hover:bg-gray-200 h-10 sm:w-[580px] w-full rounded-2xl outline-none"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="flex flex-col space-y-4">
        <h1 className="text-lg font-semibold">Expertises categories</h1>
        <div className="flex flex-col">
          <div className="flex flex-1 flex-col space-y-5">
            {searchResult || mentees ? (
              <DetailPageOfMentee
                url="mentee"
                Mentees={searchQuery ? searchResult : mentees}
              />
            ) : (
              <div className="text-xl justify-center items-center">
                no mentee found
              </div>
            )}
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default MainPart;
