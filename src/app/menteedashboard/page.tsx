"use client";
import DetailPageOfMentor from "@/components/Mentor/MentorsList";
import ReuseMentorship from "@/components/ReusedComponent/ReuseMentorship";
import { backend_url } from "@/components/constant";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RootState } from "@/redux/store";
import { IUser, mentorshipType } from "@/type";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Home = () => {
  const [searchResult, setSearchResult] = useState<IUser[]>([]);
  const [mentors, setMentors] = useState<IUser[]>([]);
  const [mentorships, setMentorships] = useState<mentorshipType[]>();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.users.user);
  const data = useSelector((state: RootState) => state.users.data);
  const id = user ? user?._id : data?._id;

  useEffect(() => {
    const fetchmentors = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/users/mentor/match/${id}`
        );

        if (res.status === 200) {
          if (Array.isArray(res.data.mentors)) {
            setMentors(res.data.mentors);
          } else {
            setMentors([]); // Set to an empty array if not the expected structure
          }
        }
      } catch (error) {
        console.error("Error fetching mentors:", error);
        setMentors([]); // Set to an empty array in case of error
      }
    };

    if (id) {
      fetchmentors();
    }
  }, [id]);

  useEffect(() => {
    const fetchMentors = async () => {
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
      fetchMentors();
    } else {
      setSearchResult([]);
    }
  }, [isSearching, searchQuery]);

  useEffect(() => {
    const fetchMentorships = async () => {
      const res = await axios.get(
        `${backend_url}/api/v1/mentorship/best/match/${id}`
      );
      console.log(res.data);
      setMentorships(res.data);
    };
    fetchMentorships();
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value); // Update search query state with input value
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsSearching(true);
    }
  };

  return (
    <section className="flex flex-col space-y-8">
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
          placeholder="Search Mentors"
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
            className="text-[16px] data-[state=active]:text-cc"
          >
            Best Match
          </TabsTrigger>
          <TabsTrigger
            value="Most Recently"
            className="text-[16px] data-[state=active]:text-cc"
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
          <DetailPageOfMentor
            url={`menteedashboard`}
            mentors={searchQuery ? searchResult : mentors}
          />
        </TabsContent>
        <TabsContent value="Most Recently">
          <ReuseMentorship url="menteedashboard" mentorships={mentorships} />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default Home;
