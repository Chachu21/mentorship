import { StarIcon } from "lucide-react";
import React from "react";

const GroupMentor = () => {
  const mentorsCatagories = [
    {
      id: 1,
      title: "Development & IT",
      rating: 4.89,
      skills_count: 4236,
    },
    {
      id: 2,
      title: "Design & Creativity Art",
      rating: 4.9,
      skills_count: 36,
    },
    {
      id: 3,
      title: "Sales & Marketing",
      rating: 4.5,
      skills_count: 426,
    },
    {
      id: 4,
      title: "Social & Business",
      rating: 4.8,
      skills_count: 325,
    },
    {
      id: 5,
      title: "Health & Other",
      rating: 4.59,
      skills_count: 622,
    },
    {
      id: 6,
      title: "Machine Learning & AI",
      rating: 4.6,
      skills_count: 246,
    },
    {
      id: 7,
      title: "Communication & Languages",
      rating: 4.0,
      skills_count: 9876,
    },
  ];

  return (
    <div className="flex flex-col space-y-5">
      <h3 className="text-2xl py-3">Explore Mentors by Expertise</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {mentorsCatagories.map((mentor) => (
          <div
            key={mentor.id}
            className="flex flex-col px-5 py-3 space-y-5 w-[300px] bg-gray-100 hover:bg-gray-200 rounded-lg"
          >
            <h3 className="text-lg font-semibold">{mentor.title}</h3>
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
