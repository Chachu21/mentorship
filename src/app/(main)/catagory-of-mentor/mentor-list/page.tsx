import DetailPageOfMentor from "@/components/Mentor/MentorsList";
import Skill from "@/components/Mentor/Skill";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <Skill />
      <DetailPageOfMentor url="" />
      <div className="flex flex-col space-y-8 justify-center items-center md:mx-auto md:container px-0 md:px-64 py-20 ">
        <h2 className="text-2xl text-[#14A800]">What Is A PHP Mentor?</h2>
        <p className="text-[16px] leading-8">
          A PHP mentor is an experienced professional proficient in the PHP
          programming language, specializing in back-end development. They excel
          in translating client requirements into functional web-based solutions
          that operate seamlessly on servers. PHP mentors are adept at coding
          the intricate functionality that animates an application. In
          collaboration with designers, they ensure the front-end interface is
          user-friendly and visually appealing. While some PHP mentors possess
          front-end design capabilities, they often collaborate with UI and UX
          designers to craft engaging user interfaces supported by robust
          back-end functionality.
        </p>
      </div>
    </main>
  );
};

export default page;
