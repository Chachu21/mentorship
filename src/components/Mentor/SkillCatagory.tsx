"use client";

import { ArrowBigRight, StarIcon } from "lucide-react";
import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const statistics = [
  {
    id: 1,
    title: "Average rating for mentorship with tech talent",
    icon: (
      <div className="flex space-x-5 items-center">
        <StarIcon size={24} color="yellow" />
        <span className="text-lg font-bold">4.5</span>
      </div>
    ),
  },
  {
    id: 2,
    icon: (
      <div className="flex space-x-5 items-center">
        <span className="text-lg font-bold">211k+ contracts</span>
      </div>
    ),
    title: "Involving development and IT work in the past year.",
  },
  {
    id: 3,
    icon: (
      <div className="flex space-x-5 items-center">
        <span className="text-lg font-bold">1,665 skills</span>
      </div>
    ),
    title: "Represented by talent on Upwork.",
  },
];

const skills = [
  {
    id: 1,
    title: "PHP Developer",
    icon: (
      <div className="flex space-x-5 items-center">
        <StarIcon size={24} color="yellow" />
        <span className="text-lg font-bold">4.5 avarage rating</span>
      </div>
    ),
    footer: (
      <div className="flex justify-between group w-full hover:space-x-32 space-x-28 ">
        <div className="flex items-center pl-0">
          <span className="relative">
            <Image
              src="/assets/hero.jpg"
              alt="person1"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person2"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person3"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
        </div>
        <ArrowBigRight color="#14A800" />
      </div>
    ),
  },
  {
    id: 2,
    title: "AI and Machine Learning",
    icon: (
      <div className="flex space-x-5 items-center">
        <StarIcon size={24} color="yellow" />
        <span className="text-lg font-bold">4.5 avarage rating</span>
      </div>
    ),
    footer: (
      <div className="flex justify-between group w-full hover:space-x-32 space-x-28 ">
        <div className="flex items-center pl-0">
          <span className="relative">
            <Image
              src="/assets/hero.jpg"
              alt="person1"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person2"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person3"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
        </div>
        <ArrowBigRight color="#14A800" />
      </div>
    ),
  },
  {
    id: 3,
    title: "Next js Developer",
    icon: (
      <div className="flex space-x-5 items-center">
        <StarIcon size={24} color="yellow" />
        <span className="text-lg font-bold">4.5 avarage rating</span>
      </div>
    ),
    footer: (
      <div className="flex justify-between group w-full hover:space-x-32 space-x-28 ">
        <div className="flex items-center pl-0">
          <span className="relative">
            <Image
              src="/assets/hero.jpg"
              alt="person1"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person2"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person3"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
        </div>
        <ArrowBigRight color="#14A800" />
      </div>
    ),
  },
  {
    id: 4,
    title: "JAVA developer",
    icon: (
      <div className="flex space-x-5 items-center">
        <StarIcon size={24} color="yellow" />
        <span className="text-lg font-bold">4.5 avarage rating</span>
      </div>
    ),
    footer: (
      <div className="flex justify-between group w-full hover:space-x-32 space-x-28 ">
        <div className="flex items-center pl-0">
          <span className="relative">
            <Image
              src="/assets/hero.jpg"
              alt="person1"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person2"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
          <span className="relative -ml-3">
            <Image
              src="/assets/hero.jpg"
              alt="person3"
              width={40}
              height={40}
              className="rounded-full z-10"
            />
          </span>
        </div>
        <ArrowBigRight color="#14A800" />
      </div>
    ),
  },
];
const SkillCategory = () => {
  const router = useRouter();
  const handleClicked = () => {
    router.push("/catagory-of-mentor/mentor-list");
  };
  return (
    <section className=" md:container md:mx-auto flex flex-col space-y-5 bg-[#F9F9F9] py-10">
      <p className="text-[28px] ">
        Trustworthy remote development and IT mentors for guided mentorship.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {statistics.map((stat, index) => (
          <div key={stat.id} className="flex flex-col items-center">
            {index !== 0 && (
              <>
                <div className="block md:hidden w-full h-px bg-gray-300 my-2"></div>
                <div className="hidden md:block md:w-0.5 md:h-auto bg-gray-300 mx-5"></div>
              </>
            )}
            <Cardd title={stat.title}>{stat.icon}</Cardd>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
          {skills.map((skill) => (
            <Card
              onClick={handleClicked}
              key={skill.id}
              className="w-[213px] md:w-[280px] rounded-2xl cursor-pointer"
            >
              <CardHeader>
                <h2 className="text-lg font-semibold text-[#1F284F]">
                  {skill.title}
                </h2>
              </CardHeader>
              <CardContent>
                <span className="text-[#1F284F]">{skill.icon} </span>
              </CardContent>
              <CardFooter>
                <span className="text-[#1F284F] group">{skill.footer}</span>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Button className="flex w-fit px-10 text-lg">See more skills</Button>
      </div>
    </section>
  );
};

export default SkillCategory;

interface SkillCategoryProps {
  children: ReactNode;
  title: string;
}

const Cardd = ({ children, title }: SkillCategoryProps) => {
  return (
    <div className="flex flex-col space-y-3 w-full md:w-60 py-5">
      {children}
      <p className="text-[19px]">{title}</p>
    </div>
  );
};
