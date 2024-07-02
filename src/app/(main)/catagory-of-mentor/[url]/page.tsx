"use client";

import React from "react";
import MentoHero from "@/components/Mentor/MentoHero";
import SkillCatagory from "@/components/Mentor/SkillCatagory";
import FAQ from "@/components/Mentor/FAQ";
import { usePathname } from "next/navigation";
import { categories } from "@/components/constants/categories"; // Adjust the path as necessary

const Page = () => {
  const pathname = usePathname();
  const category = categories.find((cat) => cat.href.pathname === pathname);

  const pageTitle = category?.href.query.title || "";
  const pageSubTitle = category?.href.query.subTitle || "";
  const pageButtonText = category?.href.query.buttonText || "";
  const pageImage = category?.href.query.image || "";
  const slogan = category?.href.query.slogan || "";
  const name = category?.name || "";

  return (
    <main className="flex flex-col md:mt-32 mt-16 space-y-4">
      <MentoHero
        title={pageTitle}
        subTitle={pageSubTitle}
        buttonText={pageButtonText}
        image={pageImage}
      />
      <SkillCatagory category={name} slogan={slogan} />
      <FAQ />
    </main>
  );
};

export default Page;
