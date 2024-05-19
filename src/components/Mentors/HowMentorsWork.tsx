import { CheckCircle } from "lucide-react";
import Image from "next/image";
import React from "react";

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
    <section className="bg-white dark:bg-gray-900 dark:text-white items-center w-full">
      <div className="md:container py-5 md:mx-auto md:flex-row flex flex-col md:order-1 order-2 justify-between">
        <div className="relative flex items-center justify-center w-full mt-6 md:mt-0 md:w-1/2">
          <Image
            src="/assets/howitwork.jpg"
            alt="hero"
            width={600}
            height={500}
            layout="responsive"
          />
        </div>
        <div className="w-full md:w-1/2 md:order-2 order-1 ">
          <div className=" flex flex-col  md:max-w-md space-y-8 items-center justify-center">
            <h2 className="text-[24px] md:text-[28] font-semibold">
              Up your Mentorship, it’s easy
            </h2>
            <div>
              {lists.map((list) => (
                <div key={list.id} className="flex flex-col ml-0 md:ml-12">
                  <div className="flex items-center space-x-4">
                    <CheckCircle size={22} color="green" />
                    <h3 className="text-[20px] font-semibold">{list.title}</h3>
                  </div>
                  <p className="mt-1 ml-[38px] text-[18px] font-normal text-gray-600 dark:text-gray-400">
                    {list.subTitle}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorkOnMentors;
