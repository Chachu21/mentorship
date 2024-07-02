import React from "react";
import Hero_Part from "../ReusedComponent/Hero_Part";
interface mentorHeroProps {
  title: string;
  subTitle: string;
  buttonText: string;
  image: string;
}

const MentoHero = ({ title, subTitle, buttonText, image }:mentorHeroProps) => {
  return (
    <Hero_Part
      title={title}
      subTitle={subTitle}
      buttonText={buttonText}
      image={image}
    />
  );
};

export default MentoHero;
