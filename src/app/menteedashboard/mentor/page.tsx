import MainPart from "@/components/Mentors/MainPart";
import MentorsHero from "@/components/Mentors/MentorsHero";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <MentorsHero />
      <MainPart />
    </main>
  );
};

export default page;
