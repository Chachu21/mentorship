"use client";
import { StarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
const mentorsCatagories = [
  {
    id: 1,
    title: "Development & IT",
    url: "developmepment-and-IT",
    rating: 4.89,
    skills_count: 4236,
  },
  {
    id: 2,
    title: "Design & Creativity Art",
    url: "design-and-creativity-art",
    rating: 4.9,
    skills_count: 36,
  },
  {
    id: 3,
    title: "Sales & Marketing",
    url: "marketing-and-finances",
    rating: 4.5,
    skills_count: 426,
  },
  {
    id: 4,
    title: "Social & Business",
    url: "social-and-business",
    rating: 4.8,
    skills_count: 325,
  },
  {
    id: 5,
    title: "Health & Other",
    url: "health-and-fitness",
    rating: 4.59,
    skills_count: 622,
  },
  {
    id: 6,
    title: "Lifestyle",
    url: "lifestyle",
    rating: 4.6,
    skills_count: 246,
  },
  {
    id: 7,
    title: "Communication & Languages",
    url: "lifestyle",
    rating: 4.0,
    skills_count: 9876,
  },
];

const GroupMentor = () => {
  const router = useRouter();
  const handleClicked = (title: string) => {
    router.push(`/catagory-of-mentor/${title}`);
  };

  return (
    <div className="flex flex-col space-y-5 md:items-start items-center">
      <h3 className="md:text-2xl text-xl py-3">Explore Mentors by Expertise</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mentorsCatagories.map((mentor) => (
          <div
            onClick={() => handleClicked(mentor?.url)}
            key={mentor.id}
            className="flex flex-col px-5 py-3 space-y-5 w-[300px] bg-gray-50 hover:bg-gray-100 rounded-lg"
          >
            <h3 className="text-lg font-semibold text-gray-700">{mentor.title}</h3>
            <div className="flex justify-between items-center pb-12">
              <p className="flex items-center space-x-2">
                <StarIcon size={22} color="green" />
                <span>{mentor.rating}/5</span>
              </p>
              <p>{mentor.skills_count} skills</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupMentor;
