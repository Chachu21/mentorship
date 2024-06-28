"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardTitle } from "../ui/card";
import { useRouter } from "next/navigation";
import { IUser } from "@/type";
import axios, { AxiosError } from "axios";
import { backend_url } from "../constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toast } from "react-toastify";

interface userId {
  mentee_id: string;
  mentorshipId: string;
}

const Proposal = ({ mentee_id, mentorshipId }: userId) => {
  const router = useRouter();
  const [expandedmenteeId, setExpandedmenteeId] = useState<string | null>(null);
  const [mentee, setMentee] = useState<IUser | null>(null);
  const user = useSelector((state: RootState) => state.users.user);
  const token = user?.token;
  console.log("mentorship id: " + mentorshipId, mentee_id);
  useEffect(() => {
    const fetchmentee = async () => {
      try {
        const res = await axios.get(
          `${backend_url}/api/v1/users/get/${mentee_id}`
        );
        setMentee(res.data.user);
      } catch (error) {
        console.error("Failed to fetch mentee data", error);
      }
    };
    fetchmentee();
  }, [mentee_id]);

  const handleClicked = (
    menteeId: string | undefined,
    mentorshipId: string
  ) => {
    if (!menteeId && !mentorshipId) {
      return;
    }
    router.push(
      `/mentordashboard/proposals/${menteeId}?mentorshipId=${mentorshipId}`
    );
  };

  const toggleExpanded = (menteeId: string) => {
    setExpandedmenteeId(expandedmenteeId === menteeId ? null : menteeId);
  };

  const isTruncated = (text: string | undefined, maxLines: number) => {
    const maxLength = maxLines * 100; // Adjust this based on the average number of characters per line
    if (!text) {
      return false;
    }
    return text.length > maxLength;
  };
  const handleAgreement = async (id: string) => {
    try {
      const res = await axios.post(
        `${backend_url}/api/v1/mentorship/agreement/create/${id}`,
        {
          termsAccepted: true,
          mentee: mentee_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status == 201) {
        toast.success(res.data.message);
        router.push("/mentordashboard/contracts");
      }
    } catch (error) {
      const axiosError = error as AxiosError<{ error: string }>;
      if (axiosError.response?.status === 400) {
        toast.warning(axiosError.response.data.error);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };
  return (
    <Card
      onClick={() => handleClicked(mentee?._id, mentorshipId)}
      className="w-full hover:bg-gray-100 py-4"
    >
      <CardContent>
        <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-12 py-8">
          <div>
            <div className="border-2 border-cc rounded-full h-[120px] w-[120px]">
              <Image
                src={"/assets/profile.jpeg"}
                alt="profile"
                width={120}
                height={120}
                className="rounded-full object-fill"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex justify-between">
              <div className="ml-3">
                <CardTitle className="text-xl flex flex-col space-y-2">
                  <div>
                    <h3 className="text-3xl capitalize text-gray-700">
                      {mentee?.fullName}
                    </h3>
                    <p className="underline capitalize italic text-2xl text-cc">
                      {mentee?.professionalRole}
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
                      {mentee?.location?.state}/{mentee?.location?.region}/
                      {mentee?.location?.city}
                    </p>
                  </div>
                </CardTitle>
              </div>
              <div className="md:flex hidden cursor-pointer">
                <Button onClick={() => handleAgreement(mentorshipId)}>
                  Mentoring
                </Button>
              </div>
            </div>
            <div className="flex flex-col space-y-3">
              <CardContent>
                <p
                  className={`line-clamp-3 ${
                    expandedmenteeId === mentee?._id ? "line-clamp-none" : ""
                  }`}
                >
                  {mentee?.bio}
                </p>
                {isTruncated(mentee?.bio, 3) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(mentee?._id ?? "");
                    }}
                    className="text-cc underline hover:underline mt-2"
                  >
                    {expandedmenteeId === mentee?._id
                      ? "Show Less"
                      : "Show More"}
                  </button>
                )}
              </CardContent>
              <CardContent>
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
              </CardContent>
            </div>
          </div>
          <div className="md:hidden flex justify-end cursor-pointer">
            <Button onClick={() => handleAgreement(mentorshipId)}>
              Mentoring
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Proposal;
