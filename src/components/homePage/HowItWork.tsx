import React from "react";
import HowItWork from "../ReusedComponent/HowItWork";

const HowItWorks = () => {
  const lists = [
    {
      id: 1,
      title: "No cost to join",
      subTitle:
        "Register and browse professionals, explore projects, or even book a consultation.",
    },
    {
      id: 2,
      title: "Find Your Mentor and Empower Your Journey",
      subTitle:
        "Connect with experienced mentors to guide and support you in your personal and professional growth. Discover top-notch mentorship and elevate your path to success.",
    },
    {
      id: 3,
      title: "Partner with Excellence Affordably",
      subTitle:
        "Access top-tier mentorship without straining your budget. Elevate your growth journey with quality guidance at a reasonable cost",
    },
  ];

  return (
    <HowItWork
      imageSrc="/assets/howitwork.jpg"
      title="Up your Mentorship, it’s easy"
      lists={lists}
    />
  );
};

export default HowItWorks;
