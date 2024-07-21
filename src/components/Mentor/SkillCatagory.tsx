"use client";

import { StarIcon } from "lucide-react";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { backend_url } from "../constant";
import { IUser } from "@/type";

interface SkillCategoryProps {
  category: string;
  slogan: string;
}

const SkillCategory = ({ category, slogan }: SkillCategoryProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [mentors, setMentors] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [skills, setSkills] = useState<{ [key: string]: number }>({});
  const [averageRating, setAverageRating] = useState<number>(0);
  const [showMoreSkills, setShowMoreSkills] = useState(false);

  useEffect(() => {
    const fetchMentorByCategory = async () => {
      try {
        const response = await axios.get(
          `${backend_url}/api/v1/users/get/bycategory`,
          { params: { category } }
        );
        setMentors(response.data);

        const skillCounts: { [key: string]: number } = {};
        let totalRating = 0;
        let ratingCount = 0;

        response.data.forEach((mentor: IUser) => {
          mentor.skills!.forEach((skill) => {
            if (skillCounts[skill]) {
              skillCounts[skill]++;
            } else {
              skillCounts[skill] = 1;
            }
          });

          if (mentor.rate) {
            totalRating += mentor.rate;
            ratingCount++;
          }
        });

        setSkills(skillCounts);
        setAverageRating(totalRating / ratingCount);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorByCategory();
  }, [category]);

  const handleClicked = (filter: string) => {
    router.push(
      `http://localhost:3000${pathname}/mentor-list?filter=${filter}`
    );
  };

  const toggleShowMoreSkills = () => {
    setShowMoreSkills(!showMoreSkills);
  };

  return (
    <section className="md:container md:mx-auto flex flex-col space-y-5 bg-[#F9F9F9] py-10">
      <p className="text-[28px]">{slogan}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {statistics(averageRating, category, Object.keys(skills).length).map(
          (stat, index) => (
            <div key={stat.id} className="flex flex-col items-center">
              {index !== 0 && (
                <>
                  <div className="block md:hidden w-full h-px bg-gray-300 my-2"></div>
                  <div className="hidden md:block md:w-0.5 md:h-auto bg-gray-300 mx-5"></div>
                </>
              )}
              <Cardd title={stat.title}>{stat.icon}</Cardd>
            </div>
          )
        )}
      </div>

      <div className="flex flex-col space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Object.entries(skills)
            .slice(0, showMoreSkills ? undefined : 6)
            .map(([skill, count]) => (
              <Card
                onClick={() => handleClicked(skill)}
                key={skill}
                className="w-full mb-4 sm:w-[280px] rounded-2xl cursor-pointer"
              >
                <CardHeader>
                  <h2 className="text-lg font-semibold text-[#1F284F] capitalize">
                    {skill} Developer
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="flex space-x-2 text-[#1F284F] ">
                    <StarIcon size={24} color="yellow" />
                    <span className="text-lg font-bold">
                      4.5 average rating
                    </span>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex justify-between items-center space-x-32">
                    <div className="flex items-center space-x-1">
                      {mentors.slice(0, 3).map((mentor, index) => (
                        <Image
                          key={index}
                          src={mentor.profileImage.url}
                          alt={mentor.fullName}
                          width={40}
                          height={40}
                          className="rounded-full z-10"
                          style={{ marginLeft: index > 0 ? "-10px" : "0" }}
                        />
                      ))}
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="3"
                      stroke="currentColor"
                      className="size-6 text-cc"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
        {Object.keys(skills).length > 8 && (
          <Button
            onClick={toggleShowMoreSkills}
            className="flex w-fit px-10 text-lg"
          >
            {showMoreSkills ? "See less skills" : "See more skills"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default SkillCategory;

interface CarddProps {
  children: ReactNode;
  title: string;
}

const Cardd = ({ children, title }: CarddProps) => {
  return (
    <div className="flex flex-col space-y-3 w-full md:w-60 py-5">
      {children}
      <p className="text-[19px]">{title}</p>
    </div>
  );
};

const statistics = (
  averageRating: number,
  category: string,
  skillCount: number
) => [
  {
    id: 1,
    title: "Average rating for mentorship with tech talent",
    icon: (
      <div className="flex space-x-5 items-center">
        <StarIcon size={24} color="yellow" />
        <span className="text-lg font-bold">
          {averageRating ? averageRating.toFixed(1) : 0.0}
        </span>
      </div>
    ),
  },
  {
    id: 2,
    icon: (
      <div className="flex space-x-5 items-center">
        <span className="text-lg font-bold">21k+ contracts</span>
      </div>
    ),
    title: `Involving ${category} work in the past year.`,
  },
  {
    id: 3,
    icon: (
      <div className="flex space-x-5 items-center">
        <span className="text-lg font-bold">{skillCount} skills</span>
      </div>
    ),
    title: "Represented by mentors skill on mentorship.",
  },
];
