"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
const mentors = [
  {
    id: 1,
    name: "Mentor 1",
    rating: 4.5,
    review_cont: 329,
    role: "Mentor",
    service: "free",
    skill: "Next js/ react/js/ts/node js/sql/postgress",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:
      "Guidance and mentorship  services about: • Web Development • WordPress Development • DNS (how to configure your domain name) • Hosting service and servers configuration Let us discuss your project and get started!",
  },
  {
    id: 2,
    name: "Mentor 2",
    role: "Mentor",
    review_cont: 439,
    rating: 4.5,
    service: "paid",
    skill: "AI/machine learing",
    image: "/assets/hero.jpg",
    description:
      "Access the broadest network of experienced professionals ready to guide you—from immediate support to profound growth journeys.",
  },
  {
    id: 3,
    name: "Mentor 3",
    role: "Mentor",
    review_cont: 439,
    rating: 4.5,
    service: "paid",
    skill: "Business consult",
    image: "/assets/hero.jpg",
    description:
      "Access the broadest network of experienced professionals ready to guide you—from immediate support to profound growth journeys.",
  },
  {
    id: 4,
    name: "Mentor 4",
    rating: 4.95,
    review_cont: 3829,
    role: "Mentor",
    service: "paid",
    skill: "Next js/ react/js/ts/node js/sql/postgress",
    image:
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
    description:
      "Guidance and mentorship  services about: • Web Development • WordPress Development • DNS (how to configure your domain name) • Hosting service and servers configuration Let us discuss your project and get started!",
  },
  {
    id: 5,
    name: "Mentor 5",
    role: "Mentor",
    review_cont: 339,
    rating: 4.3,
    service: "paid",
    skill: "AI/machine learing",
    image: "/assets/hero.jpg",
    description:
      "Access the broadest network of experienced professionals ready to guide you—from immediate support to profound growth journeys.",
  },
  {
    id: 6,
    name: "Mentor 6",
    role: "Mentor",
    review_cont: 0,
    rating: 0,
    service: "free",
    skill: "Business consult",
    image: "/assets/hero.jpg",
    description:
      "Access the broadest network of experienced professionals ready to guide you—from immediate support to profound growth journeys.",
  },
];

const DetailPageOfMentor = () => {
  const router = useRouter();
  const handleClicked = (id: number) => {
    router.push(`/catagory-of-mentor/mentor-list/${id}`);
  };

  return (
    <div className="md:container md:mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {mentors.map((mentor) => (
        <div key={mentor.id} className="">
          <div className="">
            <Card
              onClick={() => {
                handleClicked(mentor.id);
              }}
              className="flex flex-col items-center space-y-5  md:w-[350px] w-full h-[350px] p-5"
            >
              <div className="flex justify-between items-center md:px-4 px-1">
                <div className="flex flex-col space-y-1">
                  <Image
                    src={mentor.image}
                    alt={mentor.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                  <span className="text-slate-500 text-xs">{mentor.role}</span>
                </div>
                <div className="ml-3">
                  <CardTitle className="text-xl">{mentor.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {mentor.skill}
                  </CardDescription>
                </div>
              </div>
              <div className="flex space-x-4">
                <p>
                  service:{" "}
                  <span className="text-[#14A800]">{mentor.service}</span>
                </p>
                <p className="flex space-x-3">
                  <Star color="yellow" />
                  <span>
                    {mentor.rating} ({mentor.review_cont} review)
                  </span>
                </p>
              </div>
              <CardContent>
                <p>{mentor.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailPageOfMentor;
