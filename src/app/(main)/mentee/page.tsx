import React from "react";
import HowItWorkOnMentees from "@/components/Mentees/HowItWorkOnMentees";
import MenteesHero from "@/components/Mentees/MenteesHero";
import MainPart from "@/components/Mentees/MainPart";

const page = () => {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <MenteesHero />
      <MainPart />
      <HowItWorkOnMentees />
    </main>
  );
};

export default page;
