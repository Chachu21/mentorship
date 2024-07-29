"use client";
import { IUser } from "@/type";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { CheckCircle, Star } from "lucide-react";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { backend_url } from "../constant";

const MenteeDetail = () => {
  const { mentee_id } = useParams();
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);
  const [mentee, setMentee] = useState<IUser | null>(null);
  const [message, setMessage] = useState<string>("");

  //fetch mentee information
  useEffect(() => {
    const fetchmentee = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/users/get/${mentee_id}`
        );
        setMentee(res.data.user);
      } catch (error) {
        // console.log(error);
      }
    };
    fetchmentee();
  }, [mentee_id]);

  if (!mentee) {
    return <div>Loading...</div>;
  }

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) {
      return;
    }
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };
  const isTruncated = (text: string | undefined, maxLines: number) => {
    const maxLength = maxLines * 100;
    if (!text) {
      return false;
    }
    return text.length > maxLength;
  };
  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col space-y-5 py-8">
          <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:justify-start justify-center md:items-start items-center space-x-0 md:space-x-4 md:px-4 px-1">
            <div className=" border-2 border-cc rounded-full h-[120px] w-[120px]">
              <Image
                src={mentee ? mentee.profileImage.url : "/assets/profile.jpeg"}
                alt="profile imag"
                width={120}
                height={120}
                className="rounded-full object-fill"
              />
            </div>
            <div className="ml-3">
              <div className="text-xl flex flex-col space-y-2">
                <h3 className="text-3xl capitalize text-gray-700">
                  {mentee?.fullName}
                </h3>

                <p className=" underline capitalize italic text-2xl text-cc">
                  {mentee?.professionalRole}
                </p>
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
                    {mentee?.location?.state}/{mentee?.location?.region}/
                    {mentee?.location?.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p
              className={`line-clamp-3 ${
                expandedMentorId === mentee?._id ? "line-clamp-none" : ""
              }`}
            >
              {mentee?.bio}
            </p>
            {isTruncated(mentee?.bio, 3) && (
              <button
                onClick={(e) => {
                  toggleExpanded(mentee?._id);
                }}
                className="text-cc underline hover:underline mt-2"
              >
                {expandedMentorId === mentee?._id ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <div className="flex space-x-16 items-center">
            <div className="flex flex-col space-y-4">
              <CardContent>
                <div className="flex flex-col space-y-3">
                  <p className="text-cc text-2xl underline capitalize">
                    skills
                  </p>
                  <div className="flex space-x-3">
                    {mentee?.skills?.map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 rounded-xl py-1 px-6 flex justify-center items-center w-fit pl-3"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardContent>
                <div>
                  {mentee?.is_approved ? (
                    <span className="flex space-x-2">
                      <CheckCircle className="text-cc" /> approved
                    </span>
                  ) : (
                    <div className="flex space-x-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-8 pr-2 bg-white text-cc"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                      </svg>
                      <span className="flex items-center">
                        Payment: not verifed
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </div>
            {/* <p className="flex space-x-3 pl-4">
              <Star className="text-cc" />
              <Star className="text-cc" />
              <Star className="text-cc" />
              <Star className="text-cc" />
              <Star className="text-cc" />
              <span>
                {mentee?.rate} ({325} review)
              </span>
            </p> */}
          </div>

          <div className="flex flex-col space-y-5 py-3">
            <span className="text-green-600 underline">
              review about mentee given by mentor
            </span>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3">
                <Image
                  src={"/assets/hero.jpg"}
                  alt={"profile"}
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div>
                  <h1 className="text-sm ">Mentor Name</h1>
                  <p className="flex space-x-3 items-center">
                    <Star size={18} />
                    <span> 5, may 7, 2024</span>
                  </p>
                </div>
              </div>
              <p>next js</p>
              <p>Good and fast work. Easy communication.</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardContent>
        <div className="flex flex-col space-y-3">
          <h3 className="text-lg capitalize text-gray-500">
            send message for{" "}
            <span className=" capitalize text-gray-700">{mentee.fullName}</span>
          </h3>
          <div className="flex flex-col space-y-3 max-w-2xl justify-center">
            <Textarea
              id="message"
              onChange={handleBioChange}
              placeholder="Write message here..."
              className="w-full"
            />
            <div className="text-sm text-gray-400">
              write maximum 5000 characters
            </div>
            <div className="flex justify-end">
              <Button>Send message</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MenteeDetail;
