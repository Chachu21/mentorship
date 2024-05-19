import React from "react";
import Hero_Part from "../ReusedComponent/Hero_Part";

const MentorsHero = () => {
  return (
    <div>
      <Hero_Part
        title="Book a consultation with a mentor"
        subTitle="Discuss your challenges, get your questions answered, and progress in your journey with personalized 1-on-1  and in group guidance from an experienced mentor."
        buttonText="Get Started"
        image="/assets/hero.jpg"
      />
    </div>
  );
};

export default MentorsHero;
