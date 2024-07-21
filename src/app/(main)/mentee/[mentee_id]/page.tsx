"use client";
import FAQ from "@/components/Mentor/FAQ";
import { Card, CardContent } from "@/components/ui/card";
import { IUser, mentorshipType } from "@/type";
import axios, { AxiosError } from "axios";
import { CheckCircle, CircleXIcon, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { backend_url } from "@/components/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";

const MenteeDetailPage = ({ params }: { params: { mentee_id: string } }) => {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [expandedMenteeId, setExpandedMenteeId] = useState<string | null>(null);

  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      const res = await axios.get(
        `${backend_url}/api/v1/users/get/${params.mentee_id}`
      );
      setUserData(res.data.user);
    };
    if (params.mentee_id != null) {
      fetchUserData();
    }
  }, [params.mentee_id]);


  const toggleExpanded = (menteeId: string | undefined) => {
    if (!menteeId) {
      return;
    }
    setExpandedMenteeId(expandedMenteeId === menteeId ? null : menteeId);
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
              </div>
            </div>
          </div>
          <div>
            <p
              className={`line-clamp-3 ${
                expandedMenteeId === userData?._id ? "line-clamp-none" : ""
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
                {expandedMenteeId === userData?._id ? "Show Less" : "Show More"}
              </button>
            )}
          </div>
        
          <div className="flex space-x-16 items-center">
            <div>
              <p>
                {userData?.is_approved ? (
                  <span className="flex space-x-3">
                    <CheckCircle className="text-cc" /> <span>Verified</span>
                  </span>
                ) : (
                  <span className="flex items-center">
                    <CircleXIcon className="text-gray-500 pr-3" size={28} />
                    no yet Verified
                  </span>
                )}
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
                {userData?.location?.region}/{userData?.location?.city}
              </p>
            </div>
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
          <div className="flex flex-col space-y-5 py-3">
            <div className="flex flex-col space-y-6 p-6 bg-white  max-w-3xl w-full">
              <div className="flex items-center border-b pb-3 space-x-4">
                <span className="font-semibold text-gray-700 w-2/3">
                  Full Name:
                </span>
                <span className="text-gray-900">{userData?.fullName}</span>
              </div>
              <div className="flex items-center border-b pb-3 space-x-4">
                <span className="font-semibold text-gray-700 w-2/3">
                  Phone:
                </span>
                <span className="text-gray-900">{userData?.phoneNumber}</span>
              </div>
              <div className="flex items-center border-b pb-3 space-x-4">
                <span className="font-semibold text-gray-700 w-2/3">
                  Email:
                </span>
                <span className="text-gray-900">{userData?.email}</span>
              </div>

              <div className="flex items-center border-b pb-3 space-x-4">
                <span className="font-semibold text-gray-700 w-2/3">
                  Skills:
                </span>
                <div className="text-gray-900 flex flex-wrap">
                  {userData?.skill?.map((skill, index) => (
                    <span
                      key={index}
                      className="mr-2 mb-1 px-2 py-1 bg-gray-200 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              {/* <div className="flex items-center pb-3 space-x-4">
                <span className="font-semibold text-gray-700 w-2/3">
                  Preferred Experience Level:
                </span>
                <span className="text-gray-900">
                  {userData?.preferedExperianceLevel}
                </span>
              </div> */}
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
              <div className="flex justify-end items-center p-4"></div>
            </Card>
          ) : (
            <div className="flex justify-end items-center p-4"></div>
          )}
          <div>
            <FAQ />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MenteeDetailPage;
