"use client";
import FAQ from "@/components/Mentor/FAQ";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { IUser } from "@/type";
import axios from "axios";
import { CheckCircle, CircleXIcon, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
interface mentorProps {
  mentorship_id: string;
}

const MentorDetailPage = ({ mentorship_id }: mentorProps) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/v1/mentorship/get/${mentorship_id}`
      );
      console.log(res.data.user);
      setUserData(res.data.user);
    };
    fetchUserData();
  }, [mentorship_id]);

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

  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col space-y-5">
          <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:justify-start justify-center md:items-start items-center space-x-0 md:space-x-4 md:px-4 px-1">
            <div className=" border-2 border-cc rounded-full h-[120px] w-[120px] object-fill">
              <Image
                src={
                  userData ? userData.profileImage.url : "/assets/profile.jpeg"
                }
                alt="profile imag"
                width={120}
                height={120}
                className="rounded-full object-fill"
              />
            </div>
            <div className="ml-3">
              <div className="text-xl flex flex-col space-y-2">
                <h3 className="text-3xl capitalize text-gray-700">
                  {userData?.fullName}
                </h3>

                <p className=" underline capitalize italic text-2xl text-cc">
                  {userData?.professionalRole}
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
                    {userData?.location?.state}/{userData?.location?.region}/
                    {userData?.location?.city}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p
              className={`line-clamp-3 ${
                expandedMentorId === userData?._id ? "line-clamp-none" : ""
              }`}
            >
              {userData?.bio}
            </p>
            {isTruncated(userData?.bio, 3) && (
              <button
                onClick={(e) => {
                  toggleExpanded(userData?._id);
                }}
                className="text-cc underline hover:underline mt-2"
              >
                {expandedMentorId === userData?._id ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
          <div className="flex space-x-16 items-center">
            <div>
              <p>
                {userData?.is_approved ? (
                  <span className="flex space-x-2">
                    <CheckCircle className="text-cc" /> approved
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CircleXIcon className="text-gray-500 pr-3" size={28} />
                    no yet approved
                  </span>
                )}
              </p>
            </div>
            <p>
              service:{" "}
              <span className="text-[#14A800] pl-2">{userData?.service}</span>
            </p>
          </div>
          <p className="flex space-x-3 pl-4">
            <Star className="text-cc" />
            <Star className="text-cc" />
            <Star className="text-cc" />
            <Star className="text-cc" />
            <Star className="text-cc" />
            <span>
              {userData?.rate} ({325} review)
            </span>
          </p>
          {/* <div className="flex md:flex-row flex-col space-x-3 space-y-3">
            <div className="">rating details</div>

            <div className="flex items-center mb-2">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                4.95
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                5
              </p>
            </div>
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              1,745 global ratings
            </p>
            <div className="flex items-center mt-4">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                5 star
              </a>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                70%
              </span>
            </div>
            <div className="flex items-center mt-4">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                4 star
              </a>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: "17%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                17%
              </span>
            </div>
            <div className="flex items-center mt-4">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                3 star
              </a>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: "8%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                8%
              </span>
            </div>
            <div className="flex items-center mt-4">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                2 star
              </a>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: "4%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                4%
              </span>
            </div>
            <div className="flex items-center mt-4">
              <a
                href="#"
                className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                1 star
              </a>
              <div className="w-2/4 h-5 mx-4 bg-gray-200 rounded dark:bg-gray-700">
                <div
                  className="h-5 bg-yellow-300 rounded"
                  style={{ width: "1%" }}
                ></div>
              </div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                1%
              </span>
            </div>
          </div> */}
          <div className="flex flex-col space-y-5 py-3">
            <span className="text-green-600 underline">
              review about mentor given by mentee
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
                  <h1 className="text-sm ">Mentee Name</h1>
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
        <div className="flex flex-col space-y-3">
          {userData?.service === "paid" ? (
            <Card className="gray-50 border flex flex-col space-y-3 p-5 ">
              <span>Pricing</span>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-between items-center ">
                  <p className="flex space-x-3">
                    <input type="radio" /> <span>1_Month</span>
                  </p>
                  <span>$0</span>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="flex space-x-3">
                    <input type="radio" /> <span>3_month</span>
                  </p>
                  <span>$30</span>
                </div>
                <div className="flex justify-between items-center ">
                  <p className="flex space-x-3">
                    <input type="radio" /> <span>6_month</span>
                  </p>
                  <span>$50</span>
                </div>
              </div>
              <div className="flex justify-center items-center">
                <Button className="w-fit px-5 text-lg">apply</Button>
              </div>
            </Card>
          ) : (
            <div className="flex justify-end items-center p-4">
              <Button className="text-lg">Apply For Menoring</Button>
            </div>
          )}
          <div>
            <FAQ />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MentorDetailPage;
