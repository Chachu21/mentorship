import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import HowItWork from "../ReusedComponent/HowItWork";

const HowItWorkOnMentors = () => {
  const lists = [
    {
      id: 1,
      title: "Find either free or paid",
      subTitle:
        "Explore the topics they specialize in, read reviews from other mentees, and view their availability for mentorship sessions.",
    },
    {
      id: 2,
      title: "Select a convenient time for your mentorship session",
      subTitle:
        "Request an immediate mentorship session if the mentor is available, or schedule a consultation for a later time.",
    },
    {
      id: 3,
      title: "Get 1-on-1 advice or in group  mentorship",
      subTitle:
        "Join the mentor on Zoom or other way to receive assistance with any challenges you're facing, clarify uncertainties, and establish a roadmap for success in your mentorship journey.",
    },
    {
      id: 4,
      title: "Plan your next steps with guidance from your mentor.",
      subTitle:
        "Initiate a new mentorship agreement to continue collaborating. Alternatively, explore other mentors who can assist you further with your project.",
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

export default HowItWorkOnMentors;
