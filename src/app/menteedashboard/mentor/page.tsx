import MainPart from "@/components/Mentors/MainPart";
import MentorsHero from "@/components/Mentors/MentorsHero";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col  space-y-4">
      <MentorsHero />
      <MainPart />
    </main>
  );
};

export default page;
