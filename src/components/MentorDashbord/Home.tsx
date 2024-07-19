"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { Card } from "../ui/card";
import YourMentorshipPost from "./YourMentorshipPost";
import OtherMentors from "./OtherMentors";
import MentoringPost from "./MentoringPost";
import { guidelinesData } from "../constant";

const Home = () => {
  const [guidelines, setGuidelines] = useState(guidelinesData);

  const removeGuideline = (id: number) => {
    setGuidelines(guidelines.filter((guideline) => guideline.id !== id));
  };

  return (
    <section className="flex flex-col space-y-8">
      <MentoringPost />
      <YourMentorshipPost />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {guidelines.map((guideline) => (
          <Card
            key={guideline.id}
            className={`w-full md:max-w-[340px] lg:max-w-[400px] relative px-5 py-5 space-y-3 h-[350px] ${
              guideline.className ? guideline.className : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <p className="">{guideline.headers}</p>
              <X
                className="cursor-pointer"
                size={28}
                onClick={() => removeGuideline(guideline.id)} // Call removeGuideline function on click
              />
            </div>
            <h2 className="text-2xl font-semibold pt-10">{guideline.title}</h2>
            <p className={`${guideline.className ? "" : "text-gray-500"} `}>
              {guideline.description}
            </p>
            {guideline.footer && (
              <Button
                variant={"outline"}
                className="absolute bottom-1 text-cc text-center cursor-pointer text-xl"
              >
                {guideline.footer}
              </Button>
            )}
          </Card>
        ))}
      </div>
      <OtherMentors />
    </section>
  );
};

export default Home;
