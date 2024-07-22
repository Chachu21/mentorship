import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import HowItWork from "../ReusedComponent/HowItWork";

const HowItWorkOnMentees = () => {
  const lists = [
    {
      id: 1,
      title: "Find Suitable Mentors",
      subTitle:
        "Search for mentors based on their expertise, availability, and reviews from other mentees. You can find both free and paid options.",
    },
    {
      id: 2,
      title: "Schedule Your Mentorship Session",
      subTitle:
        "Choose a time that works for you and request a mentorship session. If immediate availability is not possible, schedule a consultation for a future time.",
    },
    {
      id: 3,
      title: "Engage in 1-on-1 or Group Mentorship",
      subTitle:
        "Connect with your mentor through Zoom or other platforms. Receive personalized advice, discuss challenges, and work on strategies to achieve your goals.",
    },
    {
      id: 4,
      title: "Plan Future Steps with Mentor's Guidance",
      subTitle:
        "After your session, decide on the next steps. You can renew your mentorship agreement or explore additional mentors for further support.",
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

export default HowItWorkOnMentees;
