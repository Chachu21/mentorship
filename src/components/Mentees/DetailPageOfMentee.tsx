"use client";
import { RootState } from "@/redux/store";
import { IUser } from "@/type";
import { CheckCircle, CircleXIcon, Star, Timer } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardTitle } from "../ui/card";
interface DetailProps {
  url: string;
  Mentees?: IUser[];
}

const DetailPageOfMentee = ({ url, Mentees = [] }: DetailProps) => {
  // const [mentors, setMentors] = useState<IUser[]>([]);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.users.user);
  const data = useSelector((state: RootState) => state.users.data);

  const id = user ? user?._id : data?._id;
  const handleClicked = (id: string) => {
    router.push(`/${url}/${id}`);
  };
  const toggleExpanded = (mentorId: string) => {
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  const isTruncated = (text: string | undefined, maxLines: number) => {
    const maxLength = maxLines * 100;
    // Adjust this based on the average number of characters per line
    if (!text) {
      return false;
    }
    return text.length > maxLength;
  };
  return (
    <div className="md:container md:mx-auto w-full md:max-w-7xl py-4 space-y-12">
      {Mentees.length !== 0 ? (
        Mentees.map((mentee) => (
          <div key={mentee._id} className="">
            <div className="flex ">
              <Card
                onClick={() => {
                  handleClicked(mentee._id);
                }}
                className="w-full flex flex-col space-y-4 md:max-w-5xl px-5 py-5 hover:bg-gray-100 cursor-pointer"
              >
                <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:justify-start justify-center md:items-start items-center space-x-0 md:space-x-4 md:px-4 px-1">
                  <div className=" border-2 border-cc rounded-full h-[120px] w-[120px] object-fill">
                    <Image
                      src={
                        mentee
                          ? mentee.profileImage.url
                          : "/assets/profile.jpeg"
                      }
                      alt={mentee.fullName}
                      width={120}
                      height={120}
                      className="rounded-full object-fill"
                    />
                  </div>
                  <div className="ml-3">
                    <CardTitle className="text-xl flex flex-col space-y-2">
                      <div>
                        <h3 className="text-3xl capitalize text-gray-700">
                          {mentee.fullName}
                        </h3>
                        <p className=" underline capitalize italic text-2xl text-cc">
                          {mentee.professionalRole}
                        </p>
                      </div>
                      <div className="flex space-x-2 py-4">
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-6 text-cc"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                            />
                          </svg>
                        </div>
                        <p className="text-gray-500">
                          {mentee.location?.state}/{mentee.location?.region}/
                          {mentee.location?.city}
                        </p>
                      </div>
                    </CardTitle>
                  </div>
                </div>
                <CardContent className="flex space-x-4 text-xl">
                  <p>
                    Service:{" "}
                    <span className="text-[#14A800] pl-2 bg-gray-200 rounded-sm w-fit px-3">
                      {mentee.service}
                    </span>
                  </p>
                  <p className="flex space-x-3 pl-4">
                    <Star className="text-cc" />
                    <Star className="text-cc" />
                    <Star className="text-cc" />
                    <Star className="text-cc" />
                    <Star className="text-cc" />
                    <span>
                      {mentee.rate} ({325} review)
                    </span>
                  </p>
                </CardContent>
                <CardContent>
                  <p
                    className={`line-clamp-3 ${
                      expandedMentorId === mentee._id ? "line-clamp-none" : ""
                    }`}
                  >
                    {mentee.bio}
                  </p>
                  {isTruncated(mentee?.bio, 3) && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpanded(mentee._id);
                      }}
                      className="text-cc underline hover:underline mt-2"
                    >
                      {expandedMentorId === mentee._id
                        ? "Show Less"
                        : "Show More"}
                    </button>
                  )}
                </CardContent>
                <CardContent className="flex flex-col space-y-5">
                  <div className="flex space-x-3">
                    {mentee.skill?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 rounded-xl py-1 px-6 flex justify-center items-center w-fit pl-3"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-3xl text-gray-500">
          no match mentor
        </div>
      )}
    </div>
  );
};

export default DetailPageOfMentee;
