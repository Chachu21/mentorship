import { IUser, reviewTypes } from "@/type";
import Image from "next/image";
import React, { useState } from "react";
import { CheckCircle, CircleXIcon, Star } from "lucide-react";
import { CardContent } from "@/components/ui/card";

interface MentorDataProps {
  userData: IUser | null;
  reviews: reviewTypes[];
}

const MentorData = ({ userData, reviews }: MentorDataProps) => {
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) return;
    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  const isTruncated = (text: string | undefined, maxLines: number) => {
    const maxLength = maxLines * 100;
    if (!text) return false;
    return text.length > maxLength;
  };

  const formatDate = (dateInput: Date | undefined) => {
    if (!dateInput) {
      return;
    }
    const date = new Date(dateInput);

    // Check if it's a valid date
    if (isNaN(date.getTime())) {
      return "Invalid Date";
    }

    // Format date to "Month, Year"
    return date.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col space-y-5">
      <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:justify-start justify-center md:items-start items-center space-x-0 md:space-x-4 md:px-4 px-1">
        <div className=" border-2 border-cc rounded-full h-[120px] w-[120px] object-fill">
          <Image
            src={userData ? userData.profileImage.url : "/assets/profile.jpeg"}
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
      <CardContent>
        <div className="flex space-x-3">
          {userData?.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-200 rounded-xl py-1 px-6 flex justify-center items-center w-fit pl-3"
            >
              {skill}
            </span>
          ))}
        </div>
      </CardContent>
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
        <Star className="text-green-600" />
        <Star className="text-green-600" />
        <Star className="text-green-600" />
        <Star className="text-green-600" />
        <Star className="text-green-600" />
        <span>
          {userData?.rate} ({userData?.no_review} review)
        </span>
      </p>
      <div className="flex flex-col space-y-5 py-3">
        <span className="text-green-600 underline">
          review about mentor given by mentee
        </span>
        {reviews?.map((review, index) => (
          <div key={index} className="flex flex-col space-y-3">
            <div className="flex items-center space-x-3">
              <Image
                src={review.user.profileImage.url}
                alt={"profile"}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <h1 className="text-sm ">{review.user.fullName}</h1>
                <p className="flex space-x-3 items-center">
                  <Star size={18} color="green" />
                  <span>
                    <span className="mr-3">{review.rating},</span>
                    {formatDate(review.createdAt)}
                  </span>
                </p>
              </div>
            </div>
            <p>{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorData;
