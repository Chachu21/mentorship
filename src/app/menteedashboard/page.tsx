"use client";
import ReuseMentorship from "@/components/ReusedComponent/ReuseMentorship";
import { backend_url } from "@/components/constant";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { closeProfile } from "@/redux/features/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { IUser, mentorshipType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [mentorships, setMentorships] = useState<mentorshipType[]>([]);
  const [searchResult, setSearchResult] = useState<mentorshipType[]>([]);
  const [recently, setResently] = useState<mentorshipType[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.users.user);
  const data = useSelector((state: RootState) => state.users.data);
  const id = user ? user?._id : data?._id;

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/mentorship/best/match/${id}`
        );
        setMentorships(res.data);
      } catch (error) {
        console.error("Error fetching mentorships:", error);
      }
    };

    fetchMentorships();
  }, [id]);

  useEffect(() => {
    const fetchMentorships = async () => {
      try {
        const res = await axios.get(`${backend_url}/api/v1/mentorship/`);
        console.log(res.data);
        setResently(res.data);
      } catch (error) {
        console.error("Error fetching mentorships:", error);
      }
    };

    fetchMentorships();
  }, [id]);
  useEffect(() => {
    const searchMentorships = async () => {
      if (isSearching) {
        try {
          const res = await axios.get(
            `${backend_url}/api/v1/mentorship/search`,
            {
              params: { query: searchQuery },
            }
          );
          setSearchResult(res.data);
        } catch (error) {
          console.error("Error searching mentorships:", error);
        } finally {
          setIsSearching(false);
        }
      }
    };

    if (searchQuery !== "") {
      searchMentorships();
    } else {
      setSearchResult([]); // Clear search results when search query is empty
    }
  }, [isSearching, searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearching(true);
    }
  };

  const displayedMentorships = searchQuery ? searchResult : mentorships;

  return (
    <section
      onClick={() => dispatch(closeProfile())}
      className="flex flex-col space-y-8"
    >
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
          placeholder="Search Mentorships"
          className="pl-10 pr-3 border border-gray-300 hover:bg-gray-200 h-10 sm:w-[580px] w-full rounded-2xl outline-none"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
      </div>
      <h2 className="text-2xl">Mentors you might like</h2>

      <Tabs defaultValue="Best Match" className="">
        <TabsList className="bg-white">
          <TabsTrigger
            value="Best Match"
            className="text-[16px] data-[state=active]:text-cc cursor-pointer"
          >
            Best Match
          </TabsTrigger>
          <TabsTrigger
            value="Most Recently"
            className="text-[16px] data-[state=active]:text-cc cursor-pointer"
          >
            Most Recently
          </TabsTrigger>
        </TabsList>
        <Separator className="h-1" />
        <p className="text-gray-500  py-3 md:container">
          Browse mentorship opportunities aligned with your experience, tailored
          to mentess’s preferences, sorted by relevance
        </p>
        <Separator className="" />
        <TabsContent value="Best Match">
          <ReuseMentorship
            url="menteedashboard"
            mentorships={displayedMentorships}
          />
        </TabsContent>
        <TabsContent value="Most Recently">
          <ReuseMentorship url="menteedashboard" mentorships={recently} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Home;
