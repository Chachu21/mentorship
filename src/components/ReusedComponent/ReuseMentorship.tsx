"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { mentorshipType } from "@/type";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatDistanceToNow } from "date-fns";
import { CircleCheckBig, CircleXIcon } from "lucide-react";

interface reusePros {
  url: string;
  mentorships?: mentorshipType[];
}

const ReuseMentorship = ({ url, mentorships = [] }: reusePros) => {
  const [expandedMentorId, setExpandedMentorId] = useState<string | null>(null);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.users.user);
  const data = useSelector((state: RootState) => state.users.data);
  const id = user ? user?._id : data?._id;

  const handleClicked = (id: string | undefined) => {
    if (!id) {
      return;
    }
    router.push(`/${url}/${id}`);
  };

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) return;

    setExpandedMentorId(expandedMentorId === mentorId ? null : mentorId);
  };

  // Determines if the combined text length exceeds the maxLines * maxLength threshold
  const isTruncated = (text: string, maxLength: number) => {
    return text.length > maxLength;
  };

  return (
    <section className=" w-full md:max-w-4xl py-4 space-y-8">
      {mentorships.length > 0 &&
        mentorships.map((mentorship, index) => {
          const combinedText = `${mentorship.description} And the goal  is ${mentorship.goal}`;
          const isCurrentlyExpanded = expandedMentorId === mentorship._id;
          const truncatedText = isCurrentlyExpanded
            ? combinedText
            : `${combinedText.slice(0, 400)} ...`; // Adjust this value to control truncation length

          return (
            <Card
              key={index}
              className="w-full hover:bg-gray-100 py-4 cursorp"
              onClick={() => handleClicked(mentorship._id)}
            >
              <CardContent className="flex flex-col space-y-4">
                <div>
                  {mentorship.createdAt && (
                    <p className="text">
                      {formatDistanceToNow(new Date(mentorship.createdAt), {
                        addSuffix: true,
                      })}
                    </p>
                  )}
                </div>
                <div>
                  <h3 className="text-cc font-semibold text-2xl underline italic ">
                    {mentorship.title}{" "}
                    <span className="text-gray-700">
                      ({mentorship.duration})
                    </span>
                  </h3>
                </div>
                <div className="flex flex-col space-y-2">
                  <p className="">{truncatedText}</p>
                  <div>
                    {isTruncated(combinedText, 400) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleExpanded(mentorship._id);
                        }}
                        className="text-cc underline hover:underline mt-2"
                      >
                        {isCurrentlyExpanded ? " Show Less" : " Show More"}
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex space-x-3 items-center flex-wrap space-y-3">
                  {mentorship.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-300 px-6 rounded-xl py-1"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center sm:space-y-0 space-y-3">
                  {typeof mentorship.createdBy === "object" &&
                    mentorship.createdBy !== null && (
                      <>
                        {mentorship.createdBy.is_approved ? (
                          <div className="flex space-x-2 items-center">
                            <CircleCheckBig className="text-cc" />
                            <span className="text-cc">account is verified</span>
                          </div>
                        ) : (
                          <div className="flex space-x-2 items-center">
                            <CircleXIcon className="text-cc" />
                            <span className="text-gray-400">
                              account not verifed
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-gray-600">
                            <strong className="text-cc">Service:</strong>{" "}
                            {mentorship.service} ({mentorship.amount} Birr)
                          </p>
                        </div>
                        {mentorship.createdBy.location && (
                          <div className="flex space-x-3 items-center">
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

                            <p className="text-gray-500">
                              {mentorship.createdBy.location.region},{""}{" "}
                              {mentorship.createdBy.location.city}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                </div>
              </CardContent>
            </Card>
          );
        })}
    </section>
  );
};

export default ReuseMentorship;
