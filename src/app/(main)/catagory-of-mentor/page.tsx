import FAQ from "@/components/Mentor/FAQ";
import MentoHero from "@/components/Mentor/MentoHero";
import SkillCatagory from "@/components/Mentor/SkillCatagory";
import React from "react";

const page = () => {
  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <MentoHero />
      <SkillCatagory />
      <FAQ />
    </main>
  );
};

export default page;
