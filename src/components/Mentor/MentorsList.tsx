"use client";
import { RootState } from "@/redux/store";
import { IUser } from "@/type";
import axios from "axios";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, CardContent, CardDescription, CardTitle } from "../ui/card";
import { backend_url } from "../constant";

const DetailPageOfMentor = () => {
  const [mentors, setMentors] = useState<IUser[]>([]);
  const router = useRouter();
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

  const handleClicked = (id: string) => {
    router.push(`/catagory-of-mentor/mentor-list/${id}`);
  };
  return (
    <div className="md:container md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <div key={mentor._id} className="">
          <div className="flex ">
            <Card
              onClick={() => {
                handleClicked(mentor._id);
              }}
              className="w-full flex flex-col space-y-4 md:max-w-7xl px-5 py-5"
            >
              <div className="flex justify-between items-center md:px-4 px-1">
                <div className="flex flex-col space-y-1">
                  <Image
                    src={
                      mentor ? mentor.profileImage.url : "/assets/profile.jpeg"
                    }
                    alt={mentor.fullName}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                  <span className="text-slate-500 text-sm capitalize">
                    {mentor.role}
                  </span>
                </div>
                <div className="ml-3">
                  <CardTitle className="text-xl">{mentor.fullName}</CardTitle>
                  <CardDescription className="text-sm">
                    {mentor.skills?.map((skill, index) => (
                      <span key={index} className="text-lg font-semibold">
                        {skill}
                        {index < (mentor.skills || []).length - 1 ? " / " : ""}
                      </span>
                    ))}
                  </CardDescription>
                </div>
              </div>
              <CardContent className="flex space-x-4">
                <p>
                  service:{" "}
                  <span className="text-[#14A800]">{mentor.service}</span>
                </p>
                <p className="flex space-x-3">
                  <Star color="yellow" />
                  <span>
                    {mentor.rate} ({325} review)
                  </span>
                </p>
              </CardContent>
              <CardContent>
                <p>{mentor.bio}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailPageOfMentor;
