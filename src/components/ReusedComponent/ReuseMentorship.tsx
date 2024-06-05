"use client";
import React, { useState } from "react";
import { Card, CardContent } from "../ui/card";
import { mentorshipType } from "@/type";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { formatDistanceToNow } from "date-fns";

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

  const handleClicked = (id: string) => {
    router.push(`/${url}/${id}`);
  };

  const toggleExpanded = (mentorId: string | undefined) => {
    if (!mentorId) return;

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
    <section className="md:container md:mx-auto w-full md:max-w-7xl py-4">
      {mentorships.length > 0 &&
        mentorships.map((mentorship, index) => (
          <Card key={index} className="w-full hover:bg-gray-100 py-4">
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
                <h3 className="text-gray-700">{mentorship.title}</h3>
              </div>
              <div>
                <p className="">
                  {mentorship.description}, {mentorship.goal} and{" "}
                  {mentorship.benefit}
                </p>
                {isTruncated(mentorship.description, 3) && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpanded(mentorship._id);
                    }}
                    className="text-cc underline hover:underline mt-2"
                  >
                    {expandedMentorId === mentorship._id
                      ? "Show Less"
                      : "Show More"}
                  </button>
                )}
              </div>
              <div>{mentorship.skill}</div>
              <div>account is approved, location service</div>
            </CardContent>
          </Card>
        ))}
    </section>
  );
};

export default ReuseMentorship;
